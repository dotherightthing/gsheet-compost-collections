/**
 * @file GccUiCollection.js
 * @summary Instances of GccCollection (backend) are converted to objects
 *  and passed to the frontend where they are processed by GccUiCollection (frontend)
 */
class GccUiCollection {
  /**
   * @class
   * @public
   * @param {object} config                                    - Module configuration.
   * @param {Array}                 config.abbreviations       - Abbreviations and their expansions (used to accessibly expand collection types).
   * @param {string}                config.address             - Street address of collection.
   * @param {boolean}               config.cancelled           - Whether the collection is permanently cancelled.
   * @param {boolean}               config.collect             - Whether the collection should be collected.
   * @param {string}                config.collectionMapLocale - Map locale to append to Google Maps lookups.
   * @param {number}                config.containerQuantity   - Quantity of containers to collect.
   * @param {string}                config.containerType       - Type of container to collect.
   * @param {string}                config.dateFlag            - Any special instructions for the collection on a particular collection date (Skip, Drop, etc).
   * @param {number|string|boolean} config.dateValue           - Recorded collection amount or status or checkbox state for a particular collection date.
   * @param {string}                config.editableToggleClass - Class selector used by the notes edit buttons.
   * @param {number}                config.groupActiveIndex    - Index of this instance within a group of collections (the 'active count').
   * @param {number}                config.groupTotal          - Total number of instance within a group of collections.
   * @param {number}                config.loopIndex           - Index of this instance within a group of collections.
   * @param {string}                config.name                - The name of the customer.
   * @param {string}                config.notes               - General notes about this collection, such as where to find the container or how to contact the customer.
   * @param {boolean}               config.onHold              - Whether the collection is temporarily on hold.
   * @param {boolean}               config.pending             - Whether the collection is yet to begin.
   * @param {string}                config.runDate             - The date of the collection.
   * @param {string}                config.runName             - The name of the parent run.
   * @param {string}                config.type                - The type of customer.
   * @param {Array|null}            config.volumesAndDateFlags - Volumes and date flags.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in

    // set by GccCollection (backend)
    this.type = config.type; // customer type - used by other setters

    const {
      abbreviations,
      address, // customer type
      cancelled,
      collect,
      collectionMapLocale,
      containerQuantity,
      containerType,
      dateFlag,
      dateValue,
      editableToggleClass,
      name,
      notes,
      onHold,
      pending,
      runDate,
      runName,
      volumesAndDateFlags,
    } = config;

    // set by GccUiRunForm (backend)
    const {
      groupTotal,
      groupActiveIndex, // was index
      loopIndex,
    } = config;

    Object.assign(this, {
      abbreviations,
      address,
      cancelled,
      collect,
      collectionMapLocale,
      containerQuantity,
      containerType,
      dateFlag,
      dateValue,
      editableToggleClass,
      name,
      notes,
      onHold,
      pending,
      runDate,
      runName,
      volumesAndDateFlags,
    }, {
      groupTotal,
      groupActiveIndex, // was index
      loopIndex,
    });

    // computed
    const collectionStatus = this.getCollectionStatus();
    const typeDefinition = this.getTypeDefinition();

    Object.assign(this, {
      collectionStatus,
      typeDefinition,
    });

    // subscribe to other module's events

    pubsub.subscribe('runForm/event/change', (event) => {
      const changedEl = event.target; // form element whose value changed

      if (changedEl.dataset.collectionId) { // data-collection-id
        this.updateCheckedState(changedEl);
        this.updateCollectionColor(changedEl);
        this.updateCollectionSelection(changedEl);

        pubsub.publish('runForm/trigger/submit');
      } else if (changedEl.classList.contains(editableToggleClass)) {
        // if the state of an 'Edit' checkbox was changed

        const targetId = changedEl.getAttribute('aria-controls');
        const targetEl = document.getElementById(targetId);

        if (targetEl !== null) {
          if (changedEl.checked) {
            // if the 'Edit' checkbox was checked, make the notes editable
            this.editNotesStart(targetEl);
          } else {
            // if the 'Edit' checkbox was unchecked, make the notes static + update the hidden field with the new notes
            this.editNotesEnd(targetEl);

            // then submit the updated notes (and everything else) to the server
            pubsub.publish('runForm/trigger/submit');
          }
        }
      }
    });

    pubsub.subscribe('runForm/loaded', (data) => {
      const { id } = data;
      const inputEls = document.querySelectorAll(`#${id} [data-collection-id]`);

      inputEls.forEach((inputEl) => {
        const _this = inputEl;

        this.updateCheckedState(_this);
        this.updateCollectionColor(_this);
        this.updateCollectionSelection(_this);
      });
    });
  }

  /* Getters and Setters */

  /**
   * abbreviations
   *
   * @type {Array}
   * @memberof GccUiCollection
   */
  get abbreviations() {
    return this._abbreviations;
  }

  set abbreviations(abbreviations) {
    this._abbreviations = GccValidate.validate(abbreviations, 'Array', 'GccUiCollection.abbreviations');
  }

  /**
   * address
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get address() {
    return this._address;
  }

  set address(address) {
    this._address = GccValidate.validate(address, 'string1', 'GccUiCollection.address');
  }

  /**
   * cancelled
   *
   * @type {boolean}
   * @memberof GccUiCollection
   */
  get cancelled() {
    return this._cancelled;
  }

  set cancelled(cancelled) {
    this._cancelled = GccValidate.validate(cancelled, 'boolean', 'GccUiCollection.cancelled');
  }

  /**
   * collect
   *
   * @type {boolean}
   * @memberof GccUiCollection
   */
  get collect() {
    return this._collect;
  }

  set collect(collect) {
    this._collect = GccValidate.validate(collect, 'boolean', 'GccUiCollection.collect');
  }

  /**
   * collectionMapLocale
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get collectionMapLocale() {
    return this._collectionMapLocale;
  }

  set collectionMapLocale(collectionMapLocale) {
    this._collectionMapLocale = GccValidate.validate(collectionMapLocale, 'string1', 'GccUiCollection.collectionMapLocale');
  }

  /**
   * collectionStatus
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get collectionStatus() {
    return this._collectionStatus;
  }

  set collectionStatus(collectionStatus) {
    this._collectionStatus = GccValidate.validate(collectionStatus, 'string1', 'GccUiCollection.collectionStatus');
  }

  /**
   * containerQuantity
   *
   * @type {number}
   * @memberof GccUiCollection
   */
  get containerQuantity() {
    return this._containerQuantity;
  }

  set containerQuantity(containerQuantity) {
    const validateIf = (this.type !== 'X');
    this._containerQuantity = GccValidate.validate(containerQuantity, 'number', 'GccUiCollection.containerQuantity', validateIf);
  }

  /**
   * containerType
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get containerType() {
    return this._containerType;
  }

  set containerType(containerType) {
    const validateIf = (this.type !== 'X');
    this._containerType = GccValidate.validate(containerType, 'string1', 'GccUiCollection.containerType', validateIf);
  }

  /**
   * dateFlag
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get dateFlag() {
    return this._dateFlag;
  }

  set dateFlag(dateFlag) {
    this._dateFlag = GccValidate.validate(dateFlag, 'string', 'GccUiCollection.dateFlag');
  }

  /**
   * dateValue
   *
   * @type {number|string|boolean}
   * @memberof GccUiCollection
   */
  get dateValue() {
    return this._dateValue;
  }

  set dateValue(dateValue) {
    // must be a number (compost amount) or a string (status) or a boolean (checkbox)
    this._dateValue = GccValidate.validate(dateValue, 'number|string|boolean', 'GccUiCollection.dateValue');
  }

  /**
   * index
   *
   * @type {number}
   * @memberof GccUiCollection
   */
  get index() {
    return this._index;
  }

  set index(index) {
    this._index = GccValidate.validate(index, 'number', 'GccUiCollection.index');
  }

  /**
   * groupActiveIndex
   *
   * @type {number}
   * @memberof GccUiCollection
   */
  get groupActiveIndex() {
    return this._groupActiveIndex;
  }

  set groupActiveIndex(groupActiveIndex) {
    this._groupActiveIndex = GccValidate.validate(groupActiveIndex, 'number', 'GccUiCollection.groupActiveIndex');
  }

  /**
   * groupTotal
   *
   * @type {number}
   * @memberof GccUiCollection
   */
  get groupTotal() {
    return this._groupTotal;
  }

  set groupTotal(groupTotal) {
    this._groupTotal = GccValidate.validate(groupTotal, 'number', 'GccUiCollection.groupTotal');
  }

  /**
   * name
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = GccValidate.validate(name, 'string1', 'GccUiCollection.name');
  }

  /**
   * notes
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = GccValidate.validate(notes, 'string1', 'GccUiCollection.notes');
  }

  /**
   * onHold
   *
   * @type {boolean}
   * @memberof GccUiCollection
   */
  get onHold() {
    return this._onHold;
  }

  set onHold(onHold) {
    this._onHold = GccValidate.validate(onHold, 'boolean', 'GccUiCollection.onHold');
  }

  /**
   * pending
   *
   * @type {boolean}
   * @memberof GccUiCollection
   */
  get pending() {
    return this._pending;
  }

  set pending(pending) {
    this._pending = GccValidate.validate(pending, 'boolean', 'GccUiCollection.pending');
  }

  /**
   * runDate
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get runDate() {
    return this._runDate;
  }

  set runDate(runDate) {
    this._runDate = GccValidate.validate(runDate, 'string1', 'GccUiCollection.runDate');
  }

  /**
   * runName
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get runName() {
    return this._runName;
  }

  set runName(runName) {
    this._runName = GccValidate.validate(runName, 'string1', 'GccUiCollection.runName');
  }

  /**
   * type
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get type() {
    return this._type;
  }

  set type(type) {
    this._type = GccValidate.validate(type, 'string1', 'GccUiCollection.type');
  }

  /**
   * typeDefinition
   *
   * @type {string}
   * @memberof GccUiCollection
   */
  get typeDefinition() {
    return this._typeDefinition;
  }

  set typeDefinition(typeDefinition) {
    this._typeDefinition = GccValidate.validate(typeDefinition, 'string1', 'GccUiCollection.typeDefinition');
  }

  /**
   * volumesAndDateFlags
   *
   * @type {null|Array}
   * @memberof GccUiCollection
   */
  get volumesAndDateFlags() {
    return this._volumesAndDateFlags;
  }

  set volumesAndDateFlags(volumesAndDateFlags) {
    this._volumesAndDateFlags = GccValidate.validate(volumesAndDateFlags, 'null|Array', 'GccUiCollection.volumesAndDateFlags');
  }

  /* Instance methods */

  /**
   * editNotesStart
   *
   * @summary User starts editing of notes
   * @param {HTMLElement} element HTML Element
   * @memberof GccUiCollection
   * @see {@link https://stackoverflow.com/a/70565696/6850747}
   */
  editNotesStart(element) {
    // strip html
    const text = element.innerText;
    element.innerText = text;

    // make editable
    element.setAttribute('contenteditable', true);

    element.focus();

    if (!!element.lastChild) { // eslint-disable-line no-extra-boolean-cast
      const sel = window.getSelection();
      sel.collapse(element.lastChild, text.length);
    }
  }

  /**
   * editNotesEnd
   *
   * @summary User starts editing of notes
   * @param {HTMLElement} element HTML Element
   * @memberof GccUiCollection
   */
  editNotesEnd(element) {
    // hidden element which receives the updated value
    const targetInput = this.getTargetInput(element);

    // strip html
    const text = element.innerText;

    // store text
    targetInput.value = text.trim();

    // display html
    element.innerHTML = this.linkPhoneNumbers(text);

    // make static
    element.removeAttribute('contenteditable');
  }

  /**
   * getAddressUrl
   *
   * @summary Generate a link to the collection address using Google Maps.
   * @param {string} address Address
   * @param {string} collectionMapLocale Map locale
   * @returns {string} URL
   * @memberof GccUiCollection
   * @see {@link https://gearside.com/easily-link-to-locations-and-directions-using-the-new-google-maps/}
   */
  getAddressUrl(address, collectionMapLocale) {
    const simpleAddress = address.substring(address.lastIndexOf(',') + 1).trim();
    const localAddress = encodeURIComponent(`${simpleAddress}, ${collectionMapLocale}`);
    const url = `https://www.google.com/maps/place/${localAddress}`;

    return url;
  }

  /**
   * getChecklistItemHtml
   *
   * @summary Generate the HTML for the collection checkbox. Checked attribute set by GccUiRunForm.populateForm.
   * @param {string} collectionId Collection ID
   * @param {string} inputId Input ID
   * @param {string} targetStateId State proxy ID
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getChecklistItemHtml(collectionId, inputId, targetStateId) {
    const {
      collectionStatus,
    } = this;

    let html = '';

    if (collectionStatus === 'collect') {
      html += `<div class="input">
        <div class="select select-large grid grid-checklist grid-no-gutter">
          <label for="${inputId}-source" class="faux-select">Tick when done</label>
          <input
            type="checkbox"
            id="${inputId}-source"
            class="input-checkbox"
            data-collection-id="${collectionId}"
            data-target-input="${inputId}"
            data-target-state="${targetStateId}">
        </div>
        <input
          type="hidden"
          name="${inputId}"
          id="${inputId}"
          data-source-input="${inputId}-source"
          value="">
      </div>`;
    } else {
      html = `<input
        type="hidden"
        name="${inputId}"
        id="${inputId}"
        value="">`;
    }

    return html;
  }

  /**
   * getCollectionHtml
   *
   * @summary Generate the HTML for the collection area of the collection.
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getCollectionHtml() {
    const {
      collectionStatus,
      groupTotal,
      loopIndex,
      type,
    } = this;

    const collectionId = `collection${loopIndex.toString().padStart(2, '0')}`;
    const disclosureId = `${collectionId}-input`;
    const fieldsetBgClass = (collectionStatus !== 'collect') ? ` color-${collectionStatus}-bg-light` : '';
    const fieldsetBorderClass = (collectionStatus !== 'collect') ? ` color-${collectionStatus}-border` : '';
    const fieldsetLastClass = (loopIndex + 1 === groupTotal) ? ' last' : '';
    const inputId = `${collectionId}-volume`;
    const notesId = `${collectionId}-notes`;
    const targetStateId = `${collectionId}-target-state`;

    const containerHtml = this.getContainerHtml();

    const disclosureButtonHtml = this.getDisclosureButtonHtml(
      disclosureId,
      targetStateId,
    );

    const legendHtml = this.getLegendHtml(
      notesId,
    );

    const notesHtml = this.getNotesHtml(
      notesId,
      targetStateId,
    );

    let inputHtml;

    if (type === 'X') {
      inputHtml = this.getChecklistItemHtml(
        collectionId,
        inputId,
        targetStateId,
      );
    } else {
      inputHtml = this.getSelectHtml(
        collectionId,
        inputId,
        targetStateId,
      );
    }

    const selectionHtml = this.getSelectionHtml(
      collectionId,
    );

    const html = `<div class="fieldset-wrapper${fieldsetLastClass}">
      <div class="fieldset-liner${fieldsetBgClass}" id="${collectionId}-fieldset-liner">
        <div class="fieldset-liner-before${fieldsetBorderClass}" id="${collectionId}-fieldset-liner-before"></div>
          <fieldset>
            ${legendHtml}
            <label for="${inputId}" class="label label-run grid grid-label-run legend-adjacent">
              ${containerHtml}
              ${disclosureButtonHtml}
            </label>
            <div id="${disclosureId}" data-is-expanded="false">
              ${inputHtml}
              ${notesHtml}
            </div>
          </fieldset>
          ${selectionHtml}
        </div>
      </div>`;

    return html;
  }

  /**
   * getCollectionStatus
   *
   * @returns {string} collectionStatus
   * @memberof GccUiCollection
   */
  getCollectionStatus() {
    const statusMap = new Map([
      [ 'cancelled', 'cancelled' ],
      [ 'onHold', 'skip' ],
      [ 'pending', 'pending' ],
    ]);

    let collectionStatus = 'collect'; // default

    [ 'cancelled', 'onHold', 'pending' ].forEach((status) => {
      if (this[status] && statusMap.has(status)) {
        collectionStatus = statusMap.get(status);
      }
    });

    return collectionStatus;
  }

  /**
   * getContainerHtml
   *
   * @summary Generate the HTML for the container area of the collection.
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getContainerHtml() {
    const {
      containerType,
      containerQuantity,
    } = this;

    let html = '<span class="container-count"></span>'; // preserve nth-child targetting

    if (containerType !== '') {
      const containerPlural = (containerQuantity > 1) ? 's' : '';

      html = `<span class="container-count grid grid-container-count container-count-${containerType}">
        <span class="container-count-label small">${containerQuantity}</span>
        <span class="container-count-icon" aria-label="${containerType}${containerPlural}">
          <svg aria-hidden="true" class="icon icon-${containerType}"><use xlink:href="#${containerType}"></svg>
        </span>
      </span>`;
    }

    return html;
  }

  /**
   * getDisclosureButtonHtml
   *
   * @summary Generate the HTML for the collection disclosure button
   * @param {string} disclosureId Disclosure ID
   * @param {string} targetStateId State proxy ID
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getDisclosureButtonHtml(disclosureId, targetStateId) {
    const {
      dateFlag,
      collectionStatus,
    } = this;

    const disabled = (collectionStatus !== 'collect');

    const buttonStates = {
      cancelled: [
        {
          cssClass: 'is-cancelled',
          icon: 'cross',
        },
      ],
      collect: [
        {
          cssClass: 'is-not-complete',
          icon: dateFlag !== '' ? 'exclamation-mark' : 'question-mark',
        },
        {
          cssClass: 'is-complete',
          icon: 'tick',
        },
        {
          cssClass: 'is-editing',
          icon: 'edit',
        },
      ],
      pending: [
        {
          cssClass: 'is-on-hold',
          icon: 'dash',
        },
      ],
      skip: [
        {
          cssClass: 'is-on-hold',
          icon: 'dash',
        },
      ],
    };
    const disabledAttr = disabled ? ' disabled' : '';
    const label = 'Enter volume';

    let html = `<button
      type="button"
      class="button-disclosure button-checkbox"
      aria-label="${label}"
      aria-controls="${disclosureId}"
      data-focuses="${disclosureId}"
      aria-expanded="false"
      id="${targetStateId}"
      data-is-complete="false"
      data-is-editing="false"
      ${disabledAttr}>`;

    buttonStates[collectionStatus].forEach((state) => {
      html += `<span class="${state.cssClass}">
        <svg aria-hidden="true" class="icon icon-${state.icon}"><use xlink:href="#${state.icon}"></svg>
      </span>`;
    });

    html += '</button>';

    return html;
  }

  /**
   * getLegendHtml
   *
   * @summary Generate the HTML for the collection legend
   * @param {string} notesId Notes ID
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getLegendHtml(notesId) {
    const {
      address,
      groupActiveIndex,
      groupTotal,
      collectionMapLocale,
      name,
      type,
      typeDefinition,
    } = this;

    const addressUrl = this.getAddressUrl(address, collectionMapLocale);
    const typeDefinitionHtml = (type !== '') ? `(<abbr title="${typeDefinition}">${type}</abbr>)` : '';

    const html = `<legend>
      <div class="grid grid-legend">
        <a href="${addressUrl}" target="_blank" class="address-name" aria-describedby="${notesId}-container">
          <span class="address">
            <svg aria-hidden="true" class="icon icon-compass"><use xlink:href="#compass"></svg>
              ${address}
          </span>
          <span class="name small">
            ${groupActiveIndex}/${groupTotal} - ${name}
            ${typeDefinitionHtml}
            <span class="hidden-assistive">- map opens in new window or tab.</span>
          </span>
        </a>
        <div></div>
      </div>
    </legend>`;

    return html;
  }

  /**
   * getNotesHtml
   *
   * @summary Generate the HTML for the collection notes area.
   * @param {string} notesId Notes ID
   * @param {string} targetStateId State proxy ID
   * @returns {string} html
   * @memberof GccUiCollection
   * @todo date flag disappears after user input is written to then read from spreadsheet (#193)
   */
  getNotesHtml(notesId, targetStateId) {
    const {
      collectionStatus,
      dateFlag,
      notes,
    } = this;

    let html = '';

    if (collectionStatus === 'collect') {
      const { editableToggleClass } = this;
      const linkedNotes = this.linkPhoneNumbers(notes);

      html += `<div class="notes" id="${notesId}-container">`;

      if (dateFlag !== '') {
        const dateFlagId = GccUtils.stringToId(dateFlag);

        html += `<p>
          <span class="date-flag smaller color-${dateFlagId}-bg color-${dateFlagId}-fg">${dateFlag}</span>
        </p>`;
      }

      html += `<div class="grid grid-checklist">
          <p class="notes-editor" id="${notesId}-editor" data-target-input="${notesId}">
            ${linkedNotes}
          </p>
          <div>
            <label class="grid grid-checkbox">
              <input type="checkbox" class="input-checkbox ${editableToggleClass}" aria-controls="${notesId}-editor" data-target-state-if-checked="${targetStateId}">
              <span class="smaller">Edit</span>
            </label>
          </div>
          <input type="hidden" name="${notesId}" id="${notesId}" value="${notes}">
        </div>
      </div>`;
    } else {
      html += `<input type="hidden" name="${notesId}" id="${notesId}" value="${notes}">`;
    }

    return html;
  }

  /**
   * getSelectHtml
   *
   * @summary Generate the HTML for the collection volume select. Values are set by GccUiRunForm.populateForm.
   * @param {string} collectionId Collection ID
   * @param {string} inputId Input ID
   * @param {string} targetStateId State proxy ID
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getSelectHtml(collectionId, inputId, targetStateId) {
    const {
      collectionStatus,
      volumesAndDateFlags,
    } = this;

    let html = '';

    if (collectionStatus === 'collect') {
      html += `<div class="input">
        <div class="select grid grid-select select-large">
          <select
            name="${inputId}"
            id="${inputId}"
            data-collection-id="${collectionId}"
            data-target-state="${targetStateId}">`;

      volumesAndDateFlags.forEach((item, i) => {
        html += `<optgroup label="${item.optgroup}">`;

        item.options.forEach((option, j) => {
          if (i === 0) {
            // volumes
            const selectedAttr = (j === 0) ? ' selected' : '';
            html += `<option value="${option.value}"${selectedAttr}>${option.label}</option>`;
          } else {
            // dateFlags
            html += `<option value="${option}">${option}</option>`;
          }
        });

        html += '</optgroup>';
      });

      html += `</select>
          <span class="focus"></span>
        </div>
        <div class="grid"></div>
        <div class="grid"></div>
      </div>`;
    } else {
      html = `<input type="hidden" name="${inputId}" id="${inputId}" value="">`;
    }

    return html;
  }

  /**
   * getSelectionHtml
   *
   * @summary Generate the HTML for the collection selection output area.
   * @param {string} collectionId Collection ID
   * @returns {string} html
   * @memberof GccUiCollection
   */
  getSelectionHtml(collectionId) {
    const {
      collectionStatus,
    } = this;

    const selectionMap = new Map([
      [ 'cancelled', 'Cancelled' ],
      [ 'collect', 'To do' ],
      [ 'pending', 'Pending' ],
      [ 'skip', 'On hold' ],
    ]);

    const selection = selectionMap.get(collectionStatus);

    const html = `<p class="collection-selection smaller">
      <span class="hidden-assistive">Selection: </span>
      <span id="${collectionId}-selection">${selection}</span>
    </p>`;

    return html;
  }

  /**
   * getTargetInput
   *
   * @summary Get the HTML element which the supplied element targets.
   *  This allows the user to affect element B by interacting with element A.
   * @param {HTMLElement} element HTML Element
   * @returns {HTMLElement} targetInputEl Target element
   * @memberof GccUiCollection
   */
  getTargetInput(element) {
    const { targetInput } = element.dataset; // data-target-input
    const targetInputEl = document.getElementById(targetInput);

    return targetInputEl;
  }

  /**
   * getTypeDefinition
   *
   * @summary Get the expanded form of a type abbreviation used in the spreadsheet.
   * @returns {string} definition
   * @memberof GccUiCollection
   * @see {@link GccTest#runUnitTests}
   */
  getTypeDefinition() {
    const {
      abbreviations,
      type,
    } = this;

    let expansion = type;

    abbreviations.forEach((abbreviation) => {
      const {
        short,
        long,
      } = abbreviation;

      if (type.toLowerCase() === short) {
        expansion = long;
      }
    });

    return expansion;
  }

  /**
   * linkPhoneNumbers
   *
   * @summary Link phone numbers in a body of text.
   * @param {string} text Text
   * @returns {string} linkedText
   * @memberof GccUiCollection
   * @see {@link https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand}
   */
  linkPhoneNumbers(text) {
    // xxx 021 123 4567 yyy
    // -> xxx <a href="tel:021 234 5678" class="a">021 234 5678</a> yyy
    const replacements = text.replace(/(0204|021|022|027|028|029|03|04|06|07|09)(\s*\d+)+/g, '<a href="tel:$&" class="a">$&</a>');

    // xxx <a href="tel:021 234 5678" class="a">021 234 5678</a> yyy
    // -> ['xxx <a href=', '"tel:021 234 5678"', ' class="a">021 234 5678</a> yyy']
    let replacementParts = replacements.split(/("tel:.*?")/g);

    // ['xxx <a href=', '"tel:021 234 5678"', ' class="a">021 234 5678</a> yyy']
    // -> ['xxx <a href=', '"tel:0212345678"', ' class="a">021 234 5678</a> yyy']
    replacementParts = replacementParts.map((item) => {
      if (item.substring(0, 5) === '"tel:') {
        return item.replace(/\s/g, '');
      }

      return item;
    });

    // ['xxx <a href=', '"tel:0212345678"', ' class="a">021 234 5678</a> yyy']
    // -> 'xxx <a href="tel:0212345678" class="a">021 234 5678</a> yyy'
    const replacementPartsStr = replacementParts.join('');

    return replacementPartsStr;
  }

  /**
   * updateCheckedState
   *
   * @summary Transform the :checked UI state to a :value that the server can understand (true|false)
   *  and so that the value is always submitted to the server irrespective of the :checked state.
   * @param {HTMLElement} element HTML Element
   * @memberof GccUiCollection
   * @todo Does this need to be bidirectional?
   */
  updateCheckedState(element) {
    if (GccUiCollection.isCheckbox(element)) {
      const targetInput = this.getTargetInput(element);
      if (targetInput) {
        targetInput.value = element.checked;
      }
    }
  }

  /**
   * updateCollectionColor
   *
   * @summary Update the collection colour scheme to reflect the current selection
   * @param {HTMLElement} element HTML Element
   * @memberof GccUiCollection
   */
  updateCollectionColor(element) {
    const { collectionId } = element.dataset; // data-collection-id
    let { value } = element;

    if (GccUiCollection.isCheckbox(element)) {
      value = '';
    }

    const valueId = GccUtils.stringToId(value);
    const selectors = [
      {
        cssClass: 'fieldset-liner',
        modifiers: [
          `color-${valueId}-bg-light`,
        ],
      },
      {
        cssClass: 'fieldset-liner-before',
        modifiers: [
          `color-${valueId}-border`,
        ],
      },
    ];

    selectors.forEach((selector) => {
      const { cssClass, modifiers } = selector;
      const elementEl = document.getElementById(`${collectionId}-${cssClass}`);
      const classes = elementEl.classList;

      classes.forEach((cls) => {
        if (cls.substring(0, 6) === 'color-') {
          elementEl.classList.remove(cls);
        }
      });

      // exclude number - 0, 10, 17.5 etc
      // exclude "" - 'Select compost amount'
      if (isNaN(value) && (value !== '')) { // eslint-disable-line no-restricted-globals
        modifiers.forEach((modifier) => {
          elementEl.classList.add(modifier);
        });
      }
    });
  }

  /**
   * updateCollectionSelection
   *
   * @summary Update the visible selection output to reflect the current selection
   * @param {HTMLElement} element HTML Element
   * @memberof GccUiCollection
   */
  updateCollectionSelection(element) {
    const { collectionId } = element.dataset; // data-collection-id
    const elementId = element.getAttribute('id');
    const elementValue = element.value;
    const targetEl = document.getElementById(`${collectionId}-selection`);

    if (GccUiCollection.isCheckbox(element)) {
      if (!element.checked) {
        targetEl.innerText = 'To do';
      } else {
        targetEl.innerText = 'Done';
      }
    } else {
      const optionEl = document.querySelector(`#${elementId} option[value="${elementValue}"]`);

      if (optionEl === null) {
        targetEl.innerText = 'To do';
      } else {
        const optgroup = optionEl.parentNode;

        if ((optgroup.getAttribute('label') === 'Amount') && (elementValue !== '')) {
          targetEl.innerText = `Done - ${optionEl.innerText}`;
        } else {
          targetEl.innerText = 'To do';
        }
      }
    }
  }

  /* Static methods */

  /**
   * getSourceInput
   *
   * @summary Get the HTML element which targets the supplied element.
   *  This allows the user to affect (hidden) element B by interacting with (visible) element A.
   * @param {HTMLElement} element HTML Element
   * @returns {HTMLElement} sourceInputEl Target element
   * @memberof GccUiCollection
   * @static
   */
  static getSourceInput(element) {
    const { sourceInput } = element.dataset; // data-source-input
    const sourceInputEl = document.getElementById(sourceInput);

    return sourceInputEl;
  }

  /**
   * isCheckbox
   *
   * @summary Determine whether an element is a checkbox
   * @param {HTMLElement} element HTML Element
   * @returns {boolean} isCheckbox
   * @memberof GccUiCollection
   * @static
   */
  static isCheckbox(element) {
    let isCheckbox = false;
    const tag = element.nodeName.toLowerCase();
    const type = element.getAttribute('type');

    if ((tag === 'input') && (type === 'checkbox')) {
      isCheckbox = true;
    }

    return isCheckbox;
  }
}
