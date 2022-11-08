# GCC Code Documentation

## Classes

<dl>
<dt><a href="#GccCollection">GccCollection</a></dt>
<dd></dd>
<dt><a href="#GccColor">GccColor</a></dt>
<dd></dd>
<dt><a href="#GccContainer">GccContainer</a></dt>
<dd></dd>
<dt><a href="#GccEnv">GccEnv</a></dt>
<dd></dd>
<dt><a href="#GccPage">GccPage</a></dt>
<dd></dd>
<dt><a href="#GccRun">GccRun</a></dt>
<dd></dd>
<dt><a href="#GccRunGroup">GccRunGroup</a></dt>
<dd></dd>
<dt><a href="#GccSheet">GccSheet</a></dt>
<dd></dd>
<dt><a href="#GccTest">GccTest</a></dt>
<dd></dd>
<dt><a href="#GccUi">GccUi</a></dt>
<dd></dd>
<dt><a href="#GccUiCollection">GccUiCollection</a></dt>
<dd></dd>
<dt><a href="#GccUiCss">GccUiCss</a></dt>
<dd></dd>
<dt><a href="#GccUiDialog">GccUiDialog</a></dt>
<dd></dd>
<dt><a href="#GccUiLoader">GccUiLoader</a></dt>
<dd></dd>
<dt><a href="#GccUiRun">GccUiRun</a></dt>
<dd></dd>
<dt><a href="#GccUiRunForm">GccUiRunForm</a></dt>
<dd></dd>
<dt><a href="#GccUiSelectDisclosure">GccUiSelectDisclosure</a></dt>
<dd></dd>
<dt><a href="#GccUiSelectForm">GccUiSelectForm</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#gccIntegrationTests">gccIntegrationTests(appConfig)</a> ⇒ <code>*</code></dt>
<dd><p>gccIntegrationTests</p>
</dd>
<dt><a href="#getResultsFromServer">getResultsFromServer()</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#doGet">doGet()</a> ⇒ <code>*</code></dt>
<dd><p>doGet</p>
</dd>
<dt><a href="#gccMiddleware">gccMiddleware(classMethod, ...args)</a> ⇒ <code>*</code></dt>
<dd><p>gccMiddleware</p>
</dd>
<dt><a href="#gccSheetHandleEdit">gccSheetHandleEdit(e)</a> ⇒ <code>*</code></dt>
<dd><p>gccSheetHandleEdit</p>
</dd>
<dt><a href="#gccSheetHandleOpen">gccSheetHandleOpen()</a> ⇒ <code>*</code></dt>
<dd><p>gccSheetHandleOpen</p>
</dd>
</dl>

<a name="GccCollection"></a>

## GccCollection
**Kind**: global class  
**Summary**: Properties and methods related to a collection point on a compost run.
 Instances of GccCollection (backend) are converted to objects
 and passed to the frontend where they are processed by GccUiCollection (frontend).
 Note that GccContainer (backend) has no frontend equivalent
 so its instance object is remapped to properties when it reaches GccUiCollection (frontend).  
**Access**: public  

* [GccCollection](#GccCollection)
    * [new GccCollection(config)](#new_GccCollection_new)
    * _instance_
        * [.abbreviations](#GccCollection+abbreviations) : <code>Array</code>
        * [.address](#GccCollection+address) : <code>string</code>
        * [.cancelled](#GccCollection+cancelled) : <code>boolean</code>
        * [.collect](#GccCollection+collect) : <code>boolean</code>
        * [.container](#GccCollection+container) : <code>object</code>
        * [.dateFlag](#GccCollection+dateFlag) : <code>string</code>
        * [.dateFlags](#GccCollection+dateFlags) : <code>Array</code>
        * [.dateValue](#GccCollection+dateValue) : <code>number</code> \| <code>string</code> \| <code>boolean</code>
        * [.collectionMapLocale](#GccCollection+collectionMapLocale) : <code>string</code>
        * [.name](#GccCollection+name) : <code>string</code>
        * [.onHold](#GccCollection+onHold) : <code>boolean</code>
        * [.notes](#GccCollection+notes) : <code>string</code>
        * [.pending](#GccCollection+pending) : <code>boolean</code>
        * [.runDate](#GccCollection+runDate) : <code>string</code>
        * [.runName](#GccCollection+runName) : <code>string</code>
        * [.type](#GccCollection+type) : <code>string</code>
        * [.typeDefinition](#GccCollection+typeDefinition) : <code>string</code>
        * [.volumesAndDateFlags](#GccCollection+volumesAndDateFlags) : <code>Array</code>
    * _static_
        * [.getVolumesAndDateFlags(dateFlags, quantity, type, volumes, format)](#GccCollection.getVolumesAndDateFlags) ⇒ <code>Array</code> \| <code>string</code>

<a name="new_GccCollection_new"></a>

### new GccCollection(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.abbreviations | <code>Array</code> | Abbreviations and their expansions (used to accessibly expand collection types). |
| config.address | <code>string</code> | Street address of collection. |
| config.collectionMapLocale | <code>string</code> | Map locale to append to Google Maps lookups. |
| config.container | <code>object</code> | Instance of GccContainer. |
| config.dateFlag | <code>string</code> | Any special instructions for the collection on a particular collection date (Skip, Drop, etc). |
| config.dateFlags | <code>Array</code> | All available date flags. |
| config.dateValue | <code>number</code> \| <code>string</code> \| <code>boolean</code> | Recorded collection amount or status or checkbox state for a particular collection date. |
| config.name | <code>string</code> | The name of the customer. |
| config.notes | <code>string</code> | General notes about this collection, such as where to find the container or how to contact the customer. |
| config.runDate | <code>string</code> | The date of the collection. |
| config.runName | <code>string</code> | The name of the parent run. |
| config.type | <code>string</code> | The type of customer. |

<a name="GccCollection+abbreviations"></a>

### gccCollection.abbreviations : <code>Array</code>
abbreviations

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+address"></a>

### gccCollection.address : <code>string</code>
address

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+cancelled"></a>

### gccCollection.cancelled : <code>boolean</code>
cancelled

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+collect"></a>

### gccCollection.collect : <code>boolean</code>
collect

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+container"></a>

### gccCollection.container : <code>object</code>
container

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+dateFlag"></a>

### gccCollection.dateFlag : <code>string</code>
dateFlag

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+dateFlags"></a>

### gccCollection.dateFlags : <code>Array</code>
dateFlags

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+dateValue"></a>

### gccCollection.dateValue : <code>number</code> \| <code>string</code> \| <code>boolean</code>
dateValue

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+collectionMapLocale"></a>

### gccCollection.collectionMapLocale : <code>string</code>
collectionMapLocale

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+name"></a>

### gccCollection.name : <code>string</code>
name

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+onHold"></a>

### gccCollection.onHold : <code>boolean</code>
onHold

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+notes"></a>

### gccCollection.notes : <code>string</code>
notes

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+pending"></a>

### gccCollection.pending : <code>boolean</code>
pending

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+runDate"></a>

### gccCollection.runDate : <code>string</code>
runDate

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+runName"></a>

### gccCollection.runName : <code>string</code>
runName

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+type"></a>

### gccCollection.type : <code>string</code>
type

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+typeDefinition"></a>

### gccCollection.typeDefinition : <code>string</code>
typeDefinition

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection+volumesAndDateFlags"></a>

### gccCollection.volumesAndDateFlags : <code>Array</code>
volumesAndDateFlags

**Kind**: instance property of [<code>GccCollection</code>](#GccCollection)  
<a name="GccCollection.getVolumesAndDateFlags"></a>

### GccCollection.getVolumesAndDateFlags(dateFlags, quantity, type, volumes, format) ⇒ <code>Array</code> \| <code>string</code>
getVolumesAndDateFlags

**Kind**: static method of [<code>GccCollection</code>](#GccCollection)  
**Summary**: Generate a series of human-readable labels/options to display in the volumes/date-flags dropdown.  
**Returns**: <code>Array</code> \| <code>string</code> - volumesAndDateFlags (html: Array | spreadsheet: string)  

| Param | Type | Description |
| --- | --- | --- |
| dateFlags | <code>Array</code> | All available date flags. |
| quantity | <code>number</code> \| <code>string</code> | Quantity of containers to collect; can be '' if collection.type === 'X'. |
| type | <code>string</code> | Type of container to collect; can be '' if collection.type === 'X'. |
| volumes | <code>Array</code> | All available date flags. |
| format | <code>string</code> | Format (html or spreadsheet) |

<a name="GccColor"></a>

## GccColor
**Kind**: global class  
**Summary**: Properties and methods relating to the colours used in the app and spreadsheet.  
**Access**: public  

* [GccColor](#GccColor)
    * [new GccColor(config)](#new_GccColor_new)
    * _instance_
        * [.colors](#GccColor+colors) : <code>Array</code>
        * [.instance](#GccColor+instance) : [<code>GccColor</code>](#GccColor)
        * [.colorNamedRangeNames](#GccColor+colorNamedRangeNames) : <code>Array</code>
        * [.getColors()](#GccColor+getColors) ⇒ <code>Array</code>
        * [.getColorStyles()](#GccColor+getColorStyles) ⇒ <code>string</code>
    * _static_
        * [.getInstance(config)](#GccColor.getInstance) ⇒ [<code>GccColor</code>](#GccColor)
        * [.hexToRgb(hex)](#GccColor.hexToRgb) ⇒ <code>object</code>

<a name="new_GccColor_new"></a>

### new GccColor(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.colorNamedRangeNames | <code>Array</code> | Named range names (rather than values, as we use the cell colors) |

<a name="GccColor+colors"></a>

### gccColor.colors : <code>Array</code>
colors

**Kind**: instance property of [<code>GccColor</code>](#GccColor)  
<a name="GccColor+instance"></a>

### gccColor.instance : [<code>GccColor</code>](#GccColor)
instance

**Kind**: instance property of [<code>GccColor</code>](#GccColor)  
<a name="GccColor+colorNamedRangeNames"></a>

### gccColor.colorNamedRangeNames : <code>Array</code>
colorNamedRangeNames

**Kind**: instance property of [<code>GccColor</code>](#GccColor)  
<a name="GccColor+getColors"></a>

### gccColor.getColors() ⇒ <code>Array</code>
getColors

**Kind**: instance method of [<code>GccColor</code>](#GccColor)  
**Summary**: Get a structured list of code colours from the GCC Variables sheet.  
**Returns**: <code>Array</code> - Colors  
<a name="GccColor+getColorStyles"></a>

### gccColor.getColorStyles() ⇒ <code>string</code>
getColorStyles

**Kind**: instance method of [<code>GccColor</code>](#GccColor)  
**Summary**: Create color variables and class attributes using RGBA variations.  
**Returns**: <code>string</code> - styleHtml  
<a name="GccColor.getInstance"></a>

### GccColor.getInstance(config) ⇒ [<code>GccColor</code>](#GccColor)
getInstance

**Kind**: static method of [<code>GccColor</code>](#GccColor)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccColor</code>](#GccColor) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccColor.hexToRgb"></a>

### GccColor.hexToRgb(hex) ⇒ <code>object</code>
hexToRgb

**Kind**: static method of [<code>GccColor</code>](#GccColor)  
**Summary**: Convert hexidecimal colour notation to RGB for use with the CSS Custom Properties (variables) system.  
**Returns**: <code>object</code> - rgb  
**See**

- [runUnitTests](#GccTest+runUnitTests)
- [https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#comment107651282_14101452](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#comment107651282_14101452)


| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | Hexidecimal notation |

<a name="GccContainer"></a>

## GccContainer
**Kind**: global class  
**Summary**: Properties and methods relating to the containers used on a compost run.  
**Access**: public  
**Todo**

- [ ] Resolve duplication of capacities/types/nonVolumes/volumeFractions across instances


* [GccContainer](#GccContainer)
    * [new GccContainer(config)](#new_GccContainer_new)
    * _instance_
        * [.capacities](#GccContainer+capacities) : <code>Array</code>
        * [.nonVolumes](#GccContainer+nonVolumes) : <code>Array</code>
        * [.quantity](#GccContainer+quantity) : <code>number</code> \| <code>string</code>
        * [.type](#GccContainer+type) : <code>string</code>
        * [.types](#GccContainer+types) : <code>Array</code>
        * [.volumeFractions](#GccContainer+volumeFractions) : <code>Array</code>
        * [.volumes](#GccContainer+volumes) : <code>Array</code>
        * [.cacheInstance()](#GccContainer+cacheInstance)
        * [.fractionToValue(fraction, containerIndex, capacity)](#GccContainer+fractionToValue) ⇒ <code>string</code>
        * [.getCapacity()](#GccContainer+getCapacity) ⇒ <code>number</code>
        * [.getVolumeLabel(containerIndex, fraction, fractionNumber)](#GccContainer+getVolumeLabel) ⇒ <code>string</code>
        * [.getVolumes()](#GccContainer+getVolumes) ⇒ <code>Array</code>
    * _static_
        * [.getInstanceFromCache(type, quantity)](#GccContainer.getInstanceFromCache) ⇒ [<code>GccContainer</code>](#GccContainer) \| <code>null</code>

<a name="new_GccContainer_new"></a>

### new GccContainer(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.capacities | <code>Array</code> | All available container capacities. |
| config.nonVolumes | <code>Array</code> | All non-volume statuses available in the volume dropdown, e.g. 'No access' |
| config.quantity | <code>number</code> \| <code>string</code> | Quantity of containers to collect; can be '' if collection.type === 'X'. |
| config.type | <code>string</code> | Type of container to collect; can be '' if collection.type === 'X'. |
| config.types | <code>Array</code> | All available container types. |
| config.volumeFractions | <code>Array</code> | All volume fractions available in the volume dropdown, e.g. '3/4' |

<a name="GccContainer+capacities"></a>

### gccContainer.capacities : <code>Array</code>
capacities

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+nonVolumes"></a>

### gccContainer.nonVolumes : <code>Array</code>
nonVolumes

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+quantity"></a>

### gccContainer.quantity : <code>number</code> \| <code>string</code>
quantity

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+type"></a>

### gccContainer.type : <code>string</code>
type

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+types"></a>

### gccContainer.types : <code>Array</code>
types

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+volumeFractions"></a>

### gccContainer.volumeFractions : <code>Array</code>
volumeFractions

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+volumes"></a>

### gccContainer.volumes : <code>Array</code>
volumes

**Kind**: instance property of [<code>GccContainer</code>](#GccContainer)  
<a name="GccContainer+cacheInstance"></a>

### gccContainer.cacheInstance()
cacheInstance

**Kind**: instance method of [<code>GccContainer</code>](#GccContainer)  
**Summary**: Cache an instance of GccContainer.  
**Todo**

- [ ] This will repeatedly cache identical content, but on the other hand we do need to be able to update the cache.

<a name="GccContainer+fractionToValue"></a>

### gccContainer.fractionToValue(fraction, containerIndex, capacity) ⇒ <code>string</code>
fractionToValue

**Kind**: instance method of [<code>GccContainer</code>](#GccContainer)  
**Summary**: Convert a fraction into a number (2dp)  
**Returns**: <code>string</code> - value  
**See**: [runUnitTests](#GccTest+runUnitTests)  

| Param | Type | Description |
| --- | --- | --- |
| fraction | <code>string</code> | Fraction |
| containerIndex | <code>number</code> | Container index |
| capacity | <code>number</code> | Container capacity |

<a name="GccContainer+getCapacity"></a>

### gccContainer.getCapacity() ⇒ <code>number</code>
getCapacity

**Kind**: instance method of [<code>GccContainer</code>](#GccContainer)  
**Summary**: Get the capacity of a container.  
**Returns**: <code>number</code> - capacity  
<a name="GccContainer+getVolumeLabel"></a>

### gccContainer.getVolumeLabel(containerIndex, fraction, fractionNumber) ⇒ <code>string</code>
getVolumeLabel

**Kind**: instance method of [<code>GccContainer</code>](#GccContainer)  
**Summary**: Generate a human-readable label/option to display in the volme dropdown.
 Note: fractions > 1 are filtered out by getVolumes before they reach getVolumeLabel
 and given a label of 'Overfull' for the 'last' bucket (1st bucket if 1 bucket, 2nd bucket if 2 buckets, etc)
 otherwise ignored.  
**Returns**: <code>string</code> - containerVolumeLabel  
**See**: [runUnitTests](#GccTest+runUnitTests)  

| Param | Type | Description |
| --- | --- | --- |
| containerIndex | <code>number</code> | Container index |
| fraction | <code>string</code> | Volume fraction. |
| fractionNumber | <code>number</code> | Volume fraction as a number. |

<a name="GccContainer+getVolumes"></a>

### gccContainer.getVolumes() ⇒ <code>Array</code>
getVolumes

**Kind**: instance method of [<code>GccContainer</code>](#GccContainer)  
**Summary**: Generate a series of human-readable labels/options to display in the volume dropdown.  
**Returns**: <code>Array</code> - options  
**See**: [runUnitTests](#GccTest+runUnitTests)  
**Todo**

- [ ] Also cache this with the container

<a name="GccContainer.getInstanceFromCache"></a>

### GccContainer.getInstanceFromCache(type, quantity) ⇒ [<code>GccContainer</code>](#GccContainer) \| <code>null</code>
getInstanceFromCache

**Kind**: static method of [<code>GccContainer</code>](#GccContainer)  
**Summary**: Get a cached instance of GccContainer.  
**Returns**: [<code>GccContainer</code>](#GccContainer) \| <code>null</code> - Reinstantiated container instance  
**Todo**

- [ ] Consider storing quantities as nested objects so there's just one cache per type


| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Type of container to collect. |
| quantity | <code>number</code> | Quantity of containers to collect. |

<a name="GccEnv"></a>

## GccEnv
**Kind**: global class  
**Summary**: Environment methods.  
**Access**: public  

* [GccEnv](#GccEnv)
    * [new GccEnv(config)](#new_GccEnv_new)
    * _instance_
        * [.containerBoundAppScriptId](#GccEnv+containerBoundAppScriptId) : <code>string</code>
        * [.developerUserEmails](#GccEnv+developerUserEmails) : <code>Array</code>
        * [.env](#GccEnv+env) : <code>object</code>
        * [.headDeploymentId](#GccEnv+headDeploymentId) : <code>string</code>
        * [.instance](#GccEnv+instance) : [<code>GccEnv</code>](#GccEnv)
        * [.pubDeploymentId](#GccEnv+pubDeploymentId) : <code>string</code>
        * [.spreadsheetId](#GccEnv+spreadsheetId) : <code>string</code>
        * [.standaloneAppScriptId](#GccEnv+standaloneAppScriptId) : <code>string</code>
        * [.getEnv()](#GccEnv+getEnv) ⇒ <code>object</code>
        * [.isDev()](#GccEnv+isDev) ⇒ <code>boolean</code>
        * [.isDeveloper()](#GccEnv+isDeveloper) ⇒ <code>boolean</code>
        * [.isStable()](#GccEnv+isStable) ⇒ <code>boolean</code>
    * _static_
        * [.getInstance(config)](#GccEnv.getInstance) ⇒ [<code>GccEnv</code>](#GccEnv)

<a name="new_GccEnv_new"></a>

### new GccEnv(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.developerUserEmails | <code>Array</code> | Email address of developers who manage this project (used to displays UI elements and specify recipients for feedback emails). |
| config.env | <code>object</code> | Environment settings |
| config.env.containerBoundAppScriptId | <code>object</code> | Script ID of the container-bound (spreadsheet-linked) project                                                        sheets.google.com > (open spreadsheet) > Extensions > Apps Script > Project Settings (cog icon) > Script ID > Copy |
| config.env.headDeploymentId | <code>object</code> | Head Deployment ID from the container-bound or standalone project, depending on which one you are testing                                                        script.google.com > (open relevant project) > Deploy > Test deployments > Select type > Web app > Head Deployment ID > Copy |
| config.env.pubDeploymentId | <code>object</code> | Deployment ID from the container-bound or standalone project, depending on which one you are testing                                                        script.google.com > (open relevant project) > Deploy > Manage deployments > Initial deployment > Deployment ID > Copy |
| config.env.spreadsheetId | <code>object</code> | SPREADSHEET_ID from the spreadsheet URL:                                                        https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0 |
| config.env.standaloneAppScriptId | <code>object</code> | Script ID of the standalone (library) project                                                        script.google.com > (open standalone project) > Project Settings (cog icon) > Script ID > Copy |

<a name="GccEnv+containerBoundAppScriptId"></a>

### gccEnv.containerBoundAppScriptId : <code>string</code>
containerBoundAppScriptId

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+developerUserEmails"></a>

### gccEnv.developerUserEmails : <code>Array</code>
developerUserEmails

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+env"></a>

### gccEnv.env : <code>object</code>
env

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
**Summary**: Object containing environment properties, set by getEnv();  
<a name="GccEnv+headDeploymentId"></a>

### gccEnv.headDeploymentId : <code>string</code>
headDeploymentId

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+instance"></a>

### gccEnv.instance : [<code>GccEnv</code>](#GccEnv)
instance

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+pubDeploymentId"></a>

### gccEnv.pubDeploymentId : <code>string</code>
pubDeploymentId

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+spreadsheetId"></a>

### gccEnv.spreadsheetId : <code>string</code>
spreadsheetId

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+standaloneAppScriptId"></a>

### gccEnv.standaloneAppScriptId : <code>string</code>
standaloneAppScriptId

**Kind**: instance property of [<code>GccEnv</code>](#GccEnv)  
<a name="GccEnv+getEnv"></a>

### gccEnv.getEnv() ⇒ <code>object</code>
getEnv

**Kind**: instance method of [<code>GccEnv</code>](#GccEnv)  
**Summary**: Get environment variables.  
**Returns**: <code>object</code> - env  
<a name="GccEnv+isDev"></a>

### gccEnv.isDev() ⇒ <code>boolean</code>
isDev

**Kind**: instance method of [<code>GccEnv</code>](#GccEnv)  
**Summary**: Determine whether the app is displaying the DEV build.  
**Returns**: <code>boolean</code> - isDev  
<a name="GccEnv+isDeveloper"></a>

### gccEnv.isDeveloper() ⇒ <code>boolean</code>
isDeveloper

**Kind**: instance method of [<code>GccEnv</code>](#GccEnv)  
**Summary**: Test whether the current user is a developer of the standalone project.  
**Returns**: <code>boolean</code> - isDeveloper  
<a name="GccEnv+isStable"></a>

### gccEnv.isStable() ⇒ <code>boolean</code>
isStable

**Kind**: instance method of [<code>GccEnv</code>](#GccEnv)  
**Summary**: Is the app displaying the STABLE build  
**Returns**: <code>boolean</code> - isStable  
<a name="GccEnv.getInstance"></a>

### GccEnv.getInstance(config) ⇒ [<code>GccEnv</code>](#GccEnv)
getInstance

**Kind**: static method of [<code>GccEnv</code>](#GccEnv)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccEnv</code>](#GccEnv) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccPage"></a>

## GccPage
**Kind**: global class  
**Summary**: Properties and methods relating to the HTML templating.  
**Access**: public  
**Todo**

- [ ] Use this style of config.namedRangeValues documentation in other classes.


* [GccPage](#GccPage)
    * [new GccPage(config)](#new_GccPage_new)
    * _instance_
        * [.appName](#GccPage+appName) : <code>string</code>
        * [.config](#GccPage+config) : <code>object</code>
        * [.debug](#GccPage+debug) : <code>boolean</code>
        * [.developerUserEmails](#GccPage+developerUserEmails) : <code>Array</code>
        * [.extraCollectionsLabel](#GccPage+extraCollectionsLabel) : <code>string</code>
        * [.feedbackEmailBody](#GccPage+feedbackEmailBody) : <code>string</code>
        * [.helpLinks](#GccPage+helpLinks) : <code>Array</code>
        * [.imageFavicon](#GccPage+imageFavicon) : <code>string</code>
        * [.imageLogo](#GccPage+imageLogo) : <code>string</code>
        * [.instance](#GccPage+instance) : [<code>GccPage</code>](#GccPage)
        * [.organisationName](#GccPage+organisationName) : <code>string</code>
        * [.pageTemplate](#GccPage+pageTemplate) : <code>string</code>
        * [.pageTitle](#GccPage+pageTitle) : <code>string</code>
        * [.runGroups](#GccPage+runGroups) : <code>object</code>
        * [.addMetaTags(tpl)](#GccPage+addMetaTags) ⇒ <code>object</code>
        * [.createHtmlTemplate()](#GccPage+createHtmlTemplate) ⇒ <code>object</code>
        * [.getHelpLinks()](#GccPage+getHelpLinks) ⇒ <code>Array</code>
        * [.getFeedbackMailtoLink()](#GccPage+getFeedbackMailtoLink) ⇒ <code>string</code>
        * [.getHtmlAndVariablesFromRunDateFormObject(formObj)](#GccPage+getHtmlAndVariablesFromRunDateFormObject) ⇒ <code>object</code>
    * _static_
        * [.getInstance(config)](#GccPage.getInstance) ⇒ [<code>GccPage</code>](#GccPage)
        * [.include(filename, [tplVariables])](#GccPage.include) ⇒ <code>string</code>

<a name="new_GccPage_new"></a>

### new GccPage(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.appName | <code>string</code> | App name (used in the feedback email). |
| config.debug | <code>boolean</code> | Output debugging messages. |
| config.developerUserEmails | <code>Array</code> | Email address of developers who manage this project (used to displays UI elements and specify recipients for feedback emails). |
| config.extraCollectionsLabel | <code>string</code> | Label for the optional pre/post run checkbox. |
| config.feedbackEmailBody | <code>string</code> | Message body for the feedback email. |
| config.helpLinks | <code>string</code> | Help links (used by Quick Start guide link and help dialog links; note that spreadsheet and Feedback links are appended in code; Quick Start guide link must come first.) |
| config.imageFavicon | <code>string</code> | Image displayed when the page is bookmarked. |
| config.imageLogo | <code>string</code> | Image displayed at the bottom of the page and in the background |
| config.namedRangeValues | <code>Array</code> | Values of the various named ranges. |
| config.namedRangeValues.runGroups | <code>Array</code> | Information about each group of runs. |
| config.organisationName | <code>string</code> | Used in web browser page title. |
| config.pageTemplate | <code>string</code> | HTML template file. |
| config.pageTitle | <code>string</code> | Web browser page title. |

<a name="GccPage+appName"></a>

### gccPage.appName : <code>string</code>
appName

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+config"></a>

### gccPage.config : <code>object</code>
config

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+debug"></a>

### gccPage.debug : <code>boolean</code>
debug

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+developerUserEmails"></a>

### gccPage.developerUserEmails : <code>Array</code>
developerUserEmails

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+extraCollectionsLabel"></a>

### gccPage.extraCollectionsLabel : <code>string</code>
extraCollectionsLabel

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+feedbackEmailBody"></a>

### gccPage.feedbackEmailBody : <code>string</code>
feedbackEmailBody

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+helpLinks"></a>

### gccPage.helpLinks : <code>Array</code>
helpLinks

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+imageFavicon"></a>

### gccPage.imageFavicon : <code>string</code>
imageFavicon

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+imageLogo"></a>

### gccPage.imageLogo : <code>string</code>
imageLogo

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+instance"></a>

### gccPage.instance : [<code>GccPage</code>](#GccPage)
instance

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+organisationName"></a>

### gccPage.organisationName : <code>string</code>
organisationName

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+pageTemplate"></a>

### gccPage.pageTemplate : <code>string</code>
pageTemplate

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+pageTitle"></a>

### gccPage.pageTitle : <code>string</code>
pageTitle

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+runGroups"></a>

### gccPage.runGroups : <code>object</code>
runGroups

**Kind**: instance property of [<code>GccPage</code>](#GccPage)  
<a name="GccPage+addMetaTags"></a>

### gccPage.addMetaTags(tpl) ⇒ <code>object</code>
addMetaTags

**Kind**: instance method of [<code>GccPage</code>](#GccPage)  
**Summary**: The app runs within a nested iframe. Add meta tags to the parent page.  
**Returns**: <code>object</code> - tpl - HtmlTemplate object  
**See**

- [https://developers.google.com/web/fundamentals/native-hardware/fullscreen/](https://developers.google.com/web/fundamentals/native-hardware/fullscreen/)
- [https://appcropolis.com/apple-mobile-web-app-capable/](https://appcropolis.com/apple-mobile-web-app-capable/)
- [Add to Home Screen icon for iphone](https://issuetracker.google.com/issues/176760976)
- [htmlOutput - Add support for language attribute](https://issuetracker.google.com/issues/213486384)
- [https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/](https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/)


| Param | Type | Description |
| --- | --- | --- |
| tpl | <code>object</code> | HtmlTemplate object |

<a name="GccPage+createHtmlTemplate"></a>

### gccPage.createHtmlTemplate() ⇒ <code>object</code>
createHtmlTemplate

**Kind**: instance method of [<code>GccPage</code>](#GccPage)  
**Summary**: Generates an HtmlTemplate object from the HTML file and the supplied template variables  
**Returns**: <code>object</code> - page Page  
**See**

- [https://developers.google.com/apps-script/guides/html/templates#code.gs_3](https://developers.google.com/apps-script/guides/html/templates#code.gs_3)
- [https://developers.google.com/apps-script/reference/html/html-template](https://developers.google.com/apps-script/reference/html/html-template)
- [https://www.youtube.com/watch?v=VyNJtjH84Aw](https://www.youtube.com/watch?v=VyNJtjH84Aw)

<a name="GccPage+getHelpLinks"></a>

### gccPage.getHelpLinks() ⇒ <code>Array</code>
getHelpLinks

**Kind**: instance method of [<code>GccPage</code>](#GccPage)  
**Summary**: Get links used in Help dialog.  
**Returns**: <code>Array</code> - helpLinks  
<a name="GccPage+getFeedbackMailtoLink"></a>

### gccPage.getFeedbackMailtoLink() ⇒ <code>string</code>
getFeedbackMailtoLink

**Kind**: instance method of [<code>GccPage</code>](#GccPage)  
**Summary**: Get the URL for the Feedback link in the page footer.  
**Returns**: <code>string</code> - feedbackMailtoLink  
**See**: [runUnitTests](#GccTest+runUnitTests)  
<a name="GccPage+getHtmlAndVariablesFromRunDateFormObject"></a>

### gccPage.getHtmlAndVariablesFromRunDateFormObject(formObj) ⇒ <code>object</code>
getHtmlAndVariablesFromRunDateFormObject

**Kind**: instance method of [<code>GccPage</code>](#GccPage)  
**Summary**: Respond when the user selects a run name or date from the top of the page.  
**Returns**: <code>object</code> - output Object for processing by GccUiSelectForm.processSelections  

| Param | Type | Description |
| --- | --- | --- |
| formObj | <code>object</code> | Submitted form data as a simple object |

<a name="GccPage.getInstance"></a>

### GccPage.getInstance(config) ⇒ [<code>GccPage</code>](#GccPage)
getInstance

**Kind**: static method of [<code>GccPage</code>](#GccPage)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccPage</code>](#GccPage) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccPage.include"></a>

### GccPage.include(filename, [tplVariables]) ⇒ <code>string</code>
include

**Kind**: static method of [<code>GccPage</code>](#GccPage)  
**Summary**: Import the specified file content into the current file, evaluating any variables that are passed in. Note: nested includes are not supported.  
**Returns**: <code>string</code> - HTML file contents  
**See**: [https://developers.google.com/apps-script/guides/html/best-practices#code.gs](https://developers.google.com/apps-script/guides/html/best-practices#code.gs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  | File name |
| [tplVariables] | <code>object</code> | <code></code> | Template variables |

<a name="GccRun"></a>

## GccRun
**Kind**: global class  
**Summary**: Properties and methods relating to the physical compost run.  
**Access**: public  

* [GccRun](#GccRun)
    * [new GccRun(config)](#new_GccRun_new)
    * _instance_
        * [.abbreviations](#GccRun+abbreviations) : <code>Array</code>
        * [.collectionDateFlags](#GccRun+collectionDateFlags) : <code>Array</code>
        * [.collectionMapLocale](#GccRun+collectionMapLocale) : <code>string</code>
        * [.containerCapacities](#GccRun+containerCapacities) : <code>Array</code>
        * [.containerNonVolumes](#GccRun+containerNonVolumes) : <code>Array</code>
        * [.containerTypes](#GccRun+containerTypes) : <code>Array</code>
        * [.containerVolumeFractions](#GccRun+containerVolumeFractions) : <code>Array</code>
        * [.name](#GccRun+name) : <code>string</code>
        * [.nextRunName](#GccRun+nextRunName) : <code>string</code> \| <code>null</code>
        * [.runBlankRowsAfter](#GccRun+runBlankRowsAfter) : <code>number</code>
        * [.runBounds](#GccRun+runBounds) : <code>object</code>
        * [.runGroup](#GccRun+runGroup) : <code>object</code>
        * [.cacheInstance()](#GccRun+cacheInstance)
        * [.getBounds()](#GccRun+getBounds) ⇒ <code>object</code>
        * [.getCollections(runDate)](#GccRun+getCollections) ⇒ <code>Array</code>
        * [.getCollectionRanges(runDate)](#GccRun+getCollectionRanges) ⇒ <code>object</code>
        * [.getColumnRange(columnHeader, rowCountOverride)](#GccRun+getColumnRange) ⇒ <code>Range</code>
    * _static_
        * [.getInstanceFromCache(runName)](#GccRun.getInstanceFromCache) ⇒ [<code>GccRun</code>](#GccRun) \| <code>null</code>
        * [.getRunGroup(runName)](#GccRun.getRunGroup) ⇒ <code>object</code>

<a name="new_GccRun_new"></a>

### new GccRun(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.abbreviations | <code>Array</code> | Abbreviations and their expansions (used to accessibly expand collection types). |
| config.collectionMapLocale | <code>string</code> | City and country information (passed to Google Maps along with the address). |
| config.containerVolumeFractions | <code>string</code> | Container volume fractions (used in spreadsheet date dropdowns and app collection volume dropdowns). |
| config.name | <code>string</code> | Run name (title). |
| config.nextRunName | <code>string</code> \| <code>null</code> | Name of the next run in the sheet (below it). |
| config.runBlankRowsAfter | <code>number</code> | The number of blank rows after a run (used to calculate run bounds). |
| config.runBounds | <code>object</code> | Run position on the sheet: { startRowIndex, rowCount }. |

<a name="GccRun+abbreviations"></a>

### gccRun.abbreviations : <code>Array</code>
abbreviations

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+collectionDateFlags"></a>

### gccRun.collectionDateFlags : <code>Array</code>
collectionDateFlags

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+collectionMapLocale"></a>

### gccRun.collectionMapLocale : <code>string</code>
collectionMapLocale

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+containerCapacities"></a>

### gccRun.containerCapacities : <code>Array</code>
containerCapacities

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+containerNonVolumes"></a>

### gccRun.containerNonVolumes : <code>Array</code>
containerNonVolumes

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+containerTypes"></a>

### gccRun.containerTypes : <code>Array</code>
containerTypes

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+containerVolumeFractions"></a>

### gccRun.containerVolumeFractions : <code>Array</code>
containerVolumeFractions

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+name"></a>

### gccRun.name : <code>string</code>
name

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+nextRunName"></a>

### gccRun.nextRunName : <code>string</code> \| <code>null</code>
nextRunName

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+runBlankRowsAfter"></a>

### gccRun.runBlankRowsAfter : <code>number</code>
runBlankRowsAfter

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+runBounds"></a>

### gccRun.runBounds : <code>object</code>
runBounds

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+runGroup"></a>

### gccRun.runGroup : <code>object</code>
runGroup

**Kind**: instance property of [<code>GccRun</code>](#GccRun)  
<a name="GccRun+cacheInstance"></a>

### gccRun.cacheInstance()
cacheInstance

**Kind**: instance method of [<code>GccRun</code>](#GccRun)  
**Summary**: Cache an instance of GccRun.  
<a name="GccRun+getBounds"></a>

### gccRun.getBounds() ⇒ <code>object</code>
getBounds

**Kind**: instance method of [<code>GccRun</code>](#GccRun)  
**Summary**: Multiple runs are stored in the same spreadsheet. Get the cell range used for one run.  
**Returns**: <code>object</code> - runBounds Run bounds  
**See**: [runUnitTests](#GccTest+runUnitTests)  
<a name="GccRun+getCollections"></a>

### gccRun.getCollections(runDate) ⇒ <code>Array</code>
getCollections

**Kind**: instance method of [<code>GccRun</code>](#GccRun)  
**Summary**: Create collection points on the run.  
**Returns**: <code>Array</code> - collections  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  
**Todo**

- [ ] Store runName collection ranges (except date) with run


| Param | Type | Description |
| --- | --- | --- |
| runDate | <code>string</code> | Run date |

<a name="GccRun+getCollectionRanges"></a>

### gccRun.getCollectionRanges(runDate) ⇒ <code>object</code>
getCollectionRanges

**Kind**: instance method of [<code>GccRun</code>](#GccRun)  
**Summary**: Get row and column range for each element of a run collection.  
**Returns**: <code>object</code> - ranges  
**Todo**

- [ ] Add caching once tested


| Param | Type | Description |
| --- | --- | --- |
| runDate | <code>string</code> | Run date |

<a name="GccRun+getColumnRange"></a>

### gccRun.getColumnRange(columnHeader, rowCountOverride) ⇒ <code>Range</code>
getColumnRange

**Kind**: instance method of [<code>GccRun</code>](#GccRun)  
**Summary**: Gets a range of all rows in a specific column of a specific run  
**Returns**: <code>Range</code> - columnRange  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  
**Todo**

- [ ] This appears to be a partial duplicate of GccRun.getCollectionRanges
- [ ] getColumnIndex caches each (date) result individually - better to update the cached runGroup


| Param | Type | Description |
| --- | --- | --- |
| columnHeader | <code>string</code> | Column header |
| rowCountOverride | <code>number</code> | Override for run.rowCount |

<a name="GccRun.getInstanceFromCache"></a>

### GccRun.getInstanceFromCache(runName) ⇒ [<code>GccRun</code>](#GccRun) \| <code>null</code>
getInstanceFromCache

**Kind**: static method of [<code>GccRun</code>](#GccRun)  
**Summary**: Get a cached instance of GccRun.  
**Returns**: [<code>GccRun</code>](#GccRun) \| <code>null</code> - Reinstantiated run instance  

| Param | Type | Description |
| --- | --- | --- |
| runName | <code>string</code> | Run name |

<a name="GccRun.getRunGroup"></a>

### GccRun.getRunGroup(runName) ⇒ <code>object</code>
getRunGroup

**Kind**: static method of [<code>GccRun</code>](#GccRun)  
**Summary**: Each run belongs to a group (sheet) - retrieve that group  
**Returns**: <code>object</code> - Run group  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  
**Todo**

- [ ] Investigate adding preRunExtras, postRunExtras to runs object (getRun)
- [ ] Get from cached GccRunGroup instance


| Param | Type | Description |
| --- | --- | --- |
| runName | <code>string</code> | Run name |

<a name="GccRunGroup"></a>

## GccRunGroup
**Kind**: global class  
**Summary**: Properties and methods relating to the group of Kaicycle compost runs present on a sheet.  
**Access**: public  

* [GccRunGroup](#GccRunGroup)
    * [new GccRunGroup(config)](#new_GccRunGroup_new)
    * _instance_
        * [.columnHeaderIndices](#GccRunGroup+columnHeaderIndices) : <code>object</code>
        * [.columnHeaderRowIndex](#GccRunGroup+columnHeaderRowIndex) : <code>number</code>
        * [.dateHeaderRangeA1Notation](#GccRunGroup+dateHeaderRangeA1Notation) : <code>string</code>
        * [.dateHeaders](#GccRunGroup+dateHeaders) : <code>Array</code>
        * [.dateHeadersFormatted](#GccRunGroup+dateHeadersFormatted) : <code>Array</code>
        * [.footer](#GccRunGroup+footer) : <code>string</code>
        * [.id](#GccRunGroup+id) : <code>string</code>
        * [.preRunExtras](#GccRunGroup+preRunExtras) : <code>string</code>
        * [.postRunExtras](#GccRunGroup+postRunExtras) : <code>string</code>
        * [.runNames](#GccRunGroup+runNames) : <code>Array</code>
        * [.sheetName](#GccRunGroup+sheetName) : <code>string</code>
        * [.cacheInstance()](#GccRunGroup+cacheInstance)
        * [.getDates()](#GccRunGroup+getDates) ⇒ <code>Array</code>
        * [.getDateHeaders(getDisplayValue)](#GccRunGroup+getDateHeaders) ⇒ <code>Array</code>
        * [.getDateHeadersRange(format)](#GccRunGroup+getDateHeadersRange) ⇒ <code>Range</code> \| <code>string</code>
        * [.getNextRunDate()](#GccRunGroup+getNextRunDate) ⇒ <code>string</code>
        * [.getNextRunName(runName)](#GccRunGroup+getNextRunName) ⇒ <code>string</code> \| <code>null</code>
    * _static_
        * [.getInstanceFromCache(runGroupName)](#GccRunGroup.getInstanceFromCache) ⇒ [<code>GccRunGroup</code>](#GccRunGroup)

<a name="new_GccRunGroup_new"></a>

### new GccRunGroup(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.columnHeaderIndices | <code>object</code> | Index position of each column header. |
| config.columnHeaderRowIndex | <code>number</code> | Index position of the column header row. |
| config.dateFormat | <code>string</code> | Used to load the next run date. |
| config.footer | <code>string</code> | Text in footer row (boundary row at end of runs). |
| config.postRunExtras | <code>string</code> | Name/title of post-run run. |
| config.preRunExtras | <code>string</code> | Name/title of pre-run run. |
| config.runNames | <code>Array</code> | Names of the runs in this group. |
| config.sheetName | <code>string</code> | Name of the sheet. |

<a name="GccRunGroup+columnHeaderIndices"></a>

### gccRunGroup.columnHeaderIndices : <code>object</code>
columnHeaderIndices

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+columnHeaderRowIndex"></a>

### gccRunGroup.columnHeaderRowIndex : <code>number</code>
columnHeaderRowIndex

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+dateHeaderRangeA1Notation"></a>

### gccRunGroup.dateHeaderRangeA1Notation : <code>string</code>
dateHeaderRangeA1Notation

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+dateHeaders"></a>

### gccRunGroup.dateHeaders : <code>Array</code>
dateHeaders

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+dateHeadersFormatted"></a>

### gccRunGroup.dateHeadersFormatted : <code>Array</code>
dateHeadersFormatted

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+footer"></a>

### gccRunGroup.footer : <code>string</code>
footer

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+id"></a>

### gccRunGroup.id : <code>string</code>
id

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+preRunExtras"></a>

### gccRunGroup.preRunExtras : <code>string</code>
preRunExtras

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+postRunExtras"></a>

### gccRunGroup.postRunExtras : <code>string</code>
postRunExtras

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+runNames"></a>

### gccRunGroup.runNames : <code>Array</code>
runNames

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+sheetName"></a>

### gccRunGroup.sheetName : <code>string</code>
sheetName

**Kind**: instance property of [<code>GccRunGroup</code>](#GccRunGroup)  
<a name="GccRunGroup+cacheInstance"></a>

### gccRunGroup.cacheInstance()
cacheInstance

**Kind**: instance method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Summary**: Cache an instance of GccRunGroup.  
<a name="GccRunGroup+getDates"></a>

### gccRunGroup.getDates() ⇒ <code>Array</code>
getDates

**Kind**: instance method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Summary**: Gets all run dates header strings from a run sheet (not the column indices).  
**Returns**: <code>Array</code> - runDates  
**See**

- [runIntegrationTests](#GccTest+runIntegrationTests)
- [https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#createTextFinder(String)](https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#createTextFinder(String))
- [https://developers.google.com/apps-script/reference/utilities/utilities#formatDate(Date,String,String)](https://developers.google.com/apps-script/reference/utilities/utilities#formatDate(Date,String,String))
- [https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getLastColumn()](https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getLastColumn())
- [https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getRange(Integer,Integer,Integer,Integer)](https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getRange(Integer,Integer,Integer,Integer))

<a name="GccRunGroup+getDateHeaders"></a>

### gccRunGroup.getDateHeaders(getDisplayValue) ⇒ <code>Array</code>
getDateHeaders

**Kind**: instance method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Returns**: <code>Array</code> - dateHeaders  

| Param | Type | Description |
| --- | --- | --- |
| getDisplayValue | <code>boolean</code> | Get formatted display value rather than underlying value |

<a name="GccRunGroup+getDateHeadersRange"></a>

### gccRunGroup.getDateHeadersRange(format) ⇒ <code>Range</code> \| <code>string</code>
getDateHeadersRange

**Kind**: instance method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Summary**: Gets a range of all date column headers for a specific run group  
**Returns**: <code>Range</code> \| <code>string</code> - dateHeadersRange  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> | <code>&quot;range&quot;</code> | Format (range|a1Notation) |

<a name="GccRunGroup+getNextRunDate"></a>

### gccRunGroup.getNextRunDate() ⇒ <code>string</code>
getNextRunDate

**Kind**: instance method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Summary**: Gets the next run date (today or a future run date)  
**Returns**: <code>string</code> - nextRunDate  
<a name="GccRunGroup+getNextRunName"></a>

### gccRunGroup.getNextRunName(runName) ⇒ <code>string</code> \| <code>null</code>
getNextRunName

**Kind**: instance method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Summary**: Gets the name (title) of the next run in the group  
**Returns**: <code>string</code> \| <code>null</code> - nextRunName  

| Param | Type | Description |
| --- | --- | --- |
| runName | <code>string</code> | Preceding run name |

<a name="GccRunGroup.getInstanceFromCache"></a>

### GccRunGroup.getInstanceFromCache(runGroupName) ⇒ [<code>GccRunGroup</code>](#GccRunGroup)
getInstanceFromCache

**Kind**: static method of [<code>GccRunGroup</code>](#GccRunGroup)  
**Summary**: Get a cached instance of GccRunGroup.  
**Returns**: [<code>GccRunGroup</code>](#GccRunGroup) - Reinstantiated run group instance  

| Param | Type | Description |
| --- | --- | --- |
| runGroupName | <code>string</code> | Run group name (sheet name) |

<a name="GccSheet"></a>

## GccSheet
**Kind**: global class  
**Summary**: Properties and methods relating to querying of the spreadsheet.  

* [GccSheet](#GccSheet)
    * [new GccSheet(config)](#new_GccSheet_new)
    * _instance_
        * [.appName](#GccSheet+appName) : <code>string</code>
        * [.computedNamedRangeNames](#GccSheet+computedNamedRangeNames) : <code>Array</code>
        * [.dateFormat](#GccSheet+dateFormat) : <code>string</code>
        * [.debug](#GccSheet+debug) : <code>boolean</code>
        * [.helplinks](#GccSheet+helplinks) : <code>Array</code>
        * [.instance](#GccSheet+instance) : [<code>GccSheet</code>](#GccSheet)
        * [.namedRangeItems](#GccSheet+namedRangeItems) : <code>Array</code>
        * [.namedRangeValues](#GccSheet+namedRangeValues) : <code>object</code>
        * [.runBlankRowsAfter](#GccSheet+runBlankRowsAfter) : <code>number</code>
        * [.runGroupCount](#GccSheet+runGroupCount) : <code>number</code>
        * [.runGroupRunCount](#GccSheet+runGroupRunCount) : <code>number</code>
        * [.cacheLog()](#GccSheet+cacheLog) ⇒ <code>\*</code>
        * [.focusNR(namedRangeName)](#GccSheet+focusNR)
        * [.getActiveSpreadsheet()](#GccSheet+getActiveSpreadsheet) ⇒ <code>object</code>
        * [.getAllNamedRangeValues()](#GccSheet+getAllNamedRangeValues) ⇒ <code>object</code>
        * [.getLastRowIndex(sheetName, footer)](#GccSheet+getLastRowIndex) ⇒ <code>number</code>
        * [.getMenu()](#GccSheet+getMenu) ⇒ <code>object</code>
        * [.getNamedRange(name)](#GccSheet+getNamedRange) ⇒ <code>Range</code>
        * [.getNamedRangeBackgrounds(name)](#GccSheet+getNamedRangeBackgrounds) ⇒ <code>Array</code>
        * [.getNamedRangeFontColors(name)](#GccSheet+getNamedRangeFontColors) ⇒ <code>Array</code>
        * [.getNamedRangeRunGroups()](#GccSheet+getNamedRangeRunGroups) ⇒ <code>Array</code>
        * [.getNamedRangeValue(name)](#GccSheet+getNamedRangeValue) ⇒ <code>\*</code>
        * [.getNamedRangeValues(name, onlyFirst)](#GccSheet+getNamedRangeValues) ⇒ <code>Array</code>
        * [.getRangeValues(runName, runDate)](#GccSheet+getRangeValues) ⇒ <code>Array</code>
        * [.getTimeZone()](#GccSheet+getTimeZone) ⇒ <code>string</code>
        * [.handleChangedColumnValue(e, columnName)](#GccSheet+handleChangedColumnValue)
        * [.handleEdit(e)](#GccSheet+handleEdit)
        * [.handleOpen()](#GccSheet+handleOpen)
        * [.setDateValidation(runGroup, [rowIndex])](#GccSheet+setDateValidation)
        * [.setDateValidationRow(runGroup, [rowIndex])](#GccSheet+setDateValidationRow) ⇒ <code>string</code>
        * [.setDateValidationRows()](#GccSheet+setDateValidationRows) ⇒ <code>string</code>
        * [.showLog(log)](#GccSheet+showLog)
        * [.showNotification(message, title, duration)](#GccSheet+showNotification)
        * [.showVersionHistory()](#GccSheet+showVersionHistory)
    * _static_
        * [.getCellByString(sheetName, cellText)](#GccSheet.getCellByString) ⇒ <code>Range</code>
        * [.getColumnIndex(sheetName, cellText)](#GccSheet.getColumnIndex) ⇒ <code>number</code>
        * [.getInstance(config)](#GccSheet.getInstance) ⇒ [<code>GccSheet</code>](#GccSheet)
        * [.getRowIndex(sheetName, cellText)](#GccSheet.getRowIndex) ⇒ <code>number</code>
        * [.getRunSheet(sheetName)](#GccSheet.getRunSheet) ⇒ <code>object</code>
        * [.openLink(linkUrl)](#GccSheet.openLink)
        * [.openLinkPhoneSize(linkUrl)](#GccSheet.openLinkPhoneSize)
        * [.setConditionalFormatting(runName)](#GccSheet.setConditionalFormatting)
        * [.setDateValidationCriteria(sheetName, dateHeadersRange, rowIndex, type, container, lastRow)](#GccSheet.setDateValidationCriteria)
        * [.setRangeValidationCriteria(range, criteriaType, criteriaValues, allowInvalid)](#GccSheet.setRangeValidationCriteria)
        * [.validateRangeValues(range, replacementValues)](#GccSheet.validateRangeValues) ⇒ <code>object</code>
        * [.validateValue(criteriaType, criteriaValues, cellRange, cellValue)](#GccSheet.validateValue) ⇒ <code>object</code>
        * [.writeToSheetFromRunFormObject(formObject)](#GccSheet.writeToSheetFromRunFormObject) ⇒ <code>string</code>

<a name="new_GccSheet_new"></a>

### new GccSheet(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.appName | <code>string</code> | App name (used in the feedback email). |
| config.computedNamedRangeNames | <code>Array</code> | Named ranges which are computed by the app. |
| config.dateFormat | <code>string</code> | Date format (used to locate the next run date) |
| config.debug | <code>boolean</code> | Output debugging messages. |
| config.namedRangeItems | <code>Array</code> | { name, description, validation } of the named ranges set in the spreadsheet (an array of objects). |
| config.runBlankRowsAfter | <code>number</code> | Number of blank rows after a run (used to calculate run bounds). |
| config.runGroupCount | <code>number</code> | Number of NRRunGroup items to process. |
| config.runGroupRunCount | <code>number</code> | Number of NRRunGroupRunHeader items to process. |

<a name="GccSheet+appName"></a>

### gccSheet.appName : <code>string</code>
appName

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+computedNamedRangeNames"></a>

### gccSheet.computedNamedRangeNames : <code>Array</code>
computedNamedRangeNames

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+dateFormat"></a>

### gccSheet.dateFormat : <code>string</code>
dateFormat

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+debug"></a>

### gccSheet.debug : <code>boolean</code>
debug

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+helplinks"></a>

### gccSheet.helplinks : <code>Array</code>
helplinks

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+instance"></a>

### gccSheet.instance : [<code>GccSheet</code>](#GccSheet)
instance

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+namedRangeItems"></a>

### gccSheet.namedRangeItems : <code>Array</code>
namedRangeItems

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+namedRangeValues"></a>

### gccSheet.namedRangeValues : <code>object</code>
namedRangeValues

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+runBlankRowsAfter"></a>

### gccSheet.runBlankRowsAfter : <code>number</code>
runBlankRowsAfter

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+runGroupCount"></a>

### gccSheet.runGroupCount : <code>number</code>
runGroupCount

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+runGroupRunCount"></a>

### gccSheet.runGroupRunCount : <code>number</code>
runGroupRunCount

**Kind**: instance property of [<code>GccSheet</code>](#GccSheet)  
<a name="GccSheet+cacheLog"></a>

### gccSheet.cacheLog() ⇒ <code>\*</code>
cacheLog

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Show the contents of the cache  
**Returns**: <code>\*</code> - Open link  
<a name="GccSheet+focusNR"></a>

### gccSheet.focusNR(namedRangeName)
focusNR

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Activate a specific sheet/tab in the current spreadsheet and focus a named range in it
 (from a custom menu item).  
**See**: [https://spreadsheet.dev/navigation-menu-in-google-sheets](https://spreadsheet.dev/navigation-menu-in-google-sheets)  

| Param | Type | Description |
| --- | --- | --- |
| namedRangeName | <code>string</code> | Named Range name |

<a name="GccSheet+getActiveSpreadsheet"></a>

### gccSheet.getActiveSpreadsheet() ⇒ <code>object</code>
getActiveSpreadsheet

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get the active spreadsheet (container-bound script) or the configured spreadsheet (standalone script)  
**Returns**: <code>object</code> - activeSheet  
<a name="GccSheet+getAllNamedRangeValues"></a>

### gccSheet.getAllNamedRangeValues() ⇒ <code>object</code>
getAllNamedRangeValues

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Retrieve, validate and cache all named ranges upfront, to mitigate app failure due to bad input.
 Note: arguments are passed in rather than retrieved from the instantiated class
 as this function is called during instantiation  
**Returns**: <code>object</code> - namedRangeValues  
**See**: [https://stackoverflow.com/questions/35288998/how-to-remove-data-validations](https://stackoverflow.com/questions/35288998/how-to-remove-data-validations)  
<a name="GccSheet+getLastRowIndex"></a>

### gccSheet.getLastRowIndex(sheetName, footer) ⇒ <code>number</code>
getLastRowIndex

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get the index of the last row in the spreadsheet.  
**Returns**: <code>number</code> - lastRowIndex  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  
**Todo**

- [ ] Replace with footerRowIndex


| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |
| footer | <code>string</code> | Text in footer row |

<a name="GccSheet+getMenu"></a>

### gccSheet.getMenu() ⇒ <code>object</code>
getMenu

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get the custom menu which is displayed in the spreadsheet.  
**Returns**: <code>object</code> - menu  
<a name="GccSheet+getNamedRange"></a>

### gccSheet.getNamedRange(name) ⇒ <code>Range</code>
getNamedRange

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Returns**: <code>Range</code> - namedRange  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name |

<a name="GccSheet+getNamedRangeBackgrounds"></a>

### gccSheet.getNamedRangeBackgrounds(name) ⇒ <code>Array</code>
getNamedRangeBackgrounds

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Simple wrapper function to support stubbing in unit tests.  
**Returns**: <code>Array</code> - namedRangeBackgrounds  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name |

<a name="GccSheet+getNamedRangeFontColors"></a>

### gccSheet.getNamedRangeFontColors(name) ⇒ <code>Array</code>
getNamedRangeFontColors

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Simple wrapper function to support stubbing in unit tests.  
**Returns**: <code>Array</code> - namedRangeFontColors  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name |

<a name="GccSheet+getNamedRangeRunGroups"></a>

### gccSheet.getNamedRangeRunGroups() ⇒ <code>Array</code>
getNamedRangeRunGroups

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Build runGroups object from named ranges. Called once by GccSheet.getAllNamedRangeValues.  
**Returns**: <code>Array</code> - runGroups  
**Todo**

- [ ] Change postRunExtras to postRunExtrasName
- [ ] Change preRunExtras to preRunExtrasName

<a name="GccSheet+getNamedRangeValue"></a>

### gccSheet.getNamedRangeValue(name) ⇒ <code>\*</code>
getNamedRangeValue

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Returns**: <code>\*</code> - namedRangeValue  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name |

<a name="GccSheet+getNamedRangeValues"></a>

### gccSheet.getNamedRangeValues(name, onlyFirst) ⇒ <code>Array</code>
getNamedRangeValues

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Returns**: <code>Array</code> - namedRangeValues  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name |
| onlyFirst | <code>boolean</code> | <code>false</code> | Whether to return only the first value |

<a name="GccSheet+getRangeValues"></a>

### gccSheet.getRangeValues(runName, runDate) ⇒ <code>Array</code>
getRangeValues

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Called by client-side JS on page load to populate the form with the values in the spreadsheet.  
**Returns**: <code>Array</code> - Range values  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  

| Param | Type | Description |
| --- | --- | --- |
| runName | <code>string</code> | Run name |
| runDate | <code>string</code> | Run date |

<a name="GccSheet+getTimeZone"></a>

### gccSheet.getTimeZone() ⇒ <code>string</code>
getTimeZone

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Returns**: <code>string</code> - timezone Region/City  
<a name="GccSheet+handleChangedColumnValue"></a>

### gccSheet.handleChangedColumnValue(e, columnName)
handleChangedColumnValue

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Todo**

- [ ] Get index of last date and run if edit was to the column to the right of this (line 70)


| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | Event object |
| columnName | <code>string</code> | Column name |

<a name="GccSheet+handleEdit"></a>

### gccSheet.handleEdit(e)
handleEdit

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Run when the spreadsheet is edited.  
**Todo**

- [ ] Clear cache if any/specific fields edited


| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | Event object |

<a name="GccSheet+handleOpen"></a>

### gccSheet.handleOpen()
handleOpen

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Add custom menu when the spreadsheet is opened.
For each namedRangeItem there must be a matching function in gsheet-compost-collections/src/Middleware.js, see example below  
**Todo**

- [ ] Only show App Links if user has access
- [ ] Document how to add the Named Ranges to the spreadsheet
- [ ] Add Bitly QR Codes for STABLE/DEV APP in popups

**Example**  
```js
// example of adding a namedRangeItem to gsheet-compost-collections/src/Middleware.js
function gccMiddlewareFocusNRDateFlags() {
  return gccMiddleware('GccSheet.focusNR', 'NRDateFlags');
}
```
<a name="GccSheet+setDateValidation"></a>

### gccSheet.setDateValidation(runGroup, [rowIndex])
setDateValidation

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Apply data validation rules to all visible date cells in one row or all rows.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| runGroup | <code>object</code> | <code></code> | Run group |
| [rowIndex] | <code>number</code> \| <code>null</code> | <code></code> | Row index |

<a name="GccSheet+setDateValidationRow"></a>

### gccSheet.setDateValidationRow(runGroup, [rowIndex]) ⇒ <code>string</code>
setDateValidationRow

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Apply data validation rules to all visible date cells in one row.  
**Returns**: <code>string</code> - Success message  

| Param | Type | Description |
| --- | --- | --- |
| runGroup | <code>object</code> | Run group |
| [rowIndex] | <code>number</code> \| <code>null</code> | Row index |

<a name="GccSheet+setDateValidationRows"></a>

### gccSheet.setDateValidationRows() ⇒ <code>string</code>
setDateValidationRows

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Apply data validation rules to all visible date cells in all rows. Used on handleOpen, rather than when a particular row has been updated.  
**Returns**: <code>string</code> - Success message  
**Todo**

- [ ] Document why preRunExtras and postRunExtras are added below rather than in getNamedRangeRunGroups, e.g. to limit what appears in Run A/B dropdown?

<a name="GccSheet+showLog"></a>

### gccSheet.showLog(log)
showLog

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Show contents of cache in modal (container-bound script) or console (standalone script)  

| Param | Type | Description |
| --- | --- | --- |
| log | <code>string</code> | Cache log |

<a name="GccSheet+showNotification"></a>

### gccSheet.showNotification(message, title, duration)
showNotification ('toast')

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Displays a temporary notification within a spreadsheet  
**See**: [https://spreadsheet.dev/toast-notifications-in-google-sheets](https://spreadsheet.dev/toast-notifications-in-google-sheets)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | Message |
| title | <code>string</code> | <code>&quot;GCC&quot;</code> | Title |
| duration | <code>number</code> | <code>5</code> | Duration (seconds) |

<a name="GccSheet+showVersionHistory"></a>

### gccSheet.showVersionHistory()
showVersionHistory

**Kind**: instance method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Show version history in a modal  
<a name="GccSheet.getCellByString"></a>

### GccSheet.getCellByString(sheetName, cellText) ⇒ <code>Range</code>
getCellByString

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get a reference to spreadsheet cells containing the specified text.  
**Returns**: <code>Range</code> - Range object  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |
| cellText | <code>string</code> | Cell text |

<a name="GccSheet.getColumnIndex"></a>

### GccSheet.getColumnIndex(sheetName, cellText) ⇒ <code>number</code>
getColumnIndex

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get the number of the spreadsheet column containing the specified text (to find the column headers).
 Note: this is an expensive operation as getCellByString uses createTextFinder to search the entire sheet.  
**Returns**: <code>number</code> - columnIndex  
**See**

- [runIntegrationTests](#GccTest+runIntegrationTests)
- [https://stackoverflow.com/a/64289303](https://stackoverflow.com/a/64289303)
- [https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getColumn()](https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getColumn()))

**Todo**

- [ ] For dates follow technique of setDateValidationCriteria - dateHeadersRange.getColumn() + offset


| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |
| cellText | <code>string</code> | Cell text |

<a name="GccSheet.getInstance"></a>

### GccSheet.getInstance(config) ⇒ [<code>GccSheet</code>](#GccSheet)
getInstance

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccSheet</code>](#GccSheet) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccSheet.getRowIndex"></a>

### GccSheet.getRowIndex(sheetName, cellText) ⇒ <code>number</code>
getRowIndex

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get the number of the spreadsheet row containing the specified text, to find the runs start and end rows.  
**Returns**: <code>number</code> - rowIndex  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |
| cellText | <code>string</code> | Cell text |

<a name="GccSheet.getRunSheet"></a>

### GccSheet.getRunSheet(sheetName) ⇒ <code>object</code>
getRunSheet

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Get suburbs or town spreadsheet sheet (if the user is allowed to access it).  
**Returns**: <code>object</code> - runSheet  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>object</code> | Sheet name |

<a name="GccSheet.openLink"></a>

### GccSheet.openLink(linkUrl)
openLink

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Open a URL (from a custom menu item).  
**See**

- [https://stackoverflow.com/q/25980008/6850747](https://stackoverflow.com/q/25980008/6850747)
- [https://gist.github.com/tanaikech/9115c70eb83558d3af2eea656e4d9c67](https://gist.github.com/tanaikech/9115c70eb83558d3af2eea656e4d9c67)


| Param | Type | Description |
| --- | --- | --- |
| linkUrl | <code>string</code> | Link URL |

<a name="GccSheet.openLinkPhoneSize"></a>

### GccSheet.openLinkPhoneSize(linkUrl)
openLinkPhoneSize

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Open a URL (from a custom menu item).  
**See**

- [https://stackoverflow.com/q/25980008/6850747](https://stackoverflow.com/q/25980008/6850747)
- [https://gist.github.com/tanaikech/9115c70eb83558d3af2eea656e4d9c67](https://gist.github.com/tanaikech/9115c70eb83558d3af2eea656e4d9c67)


| Param | Type | Description |
| --- | --- | --- |
| linkUrl | <code>string</code> | Link URL |

<a name="GccSheet.setConditionalFormatting"></a>

### GccSheet.setConditionalFormatting(runName)
setConditionalFormatting

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  

| Param | Type | Description |
| --- | --- | --- |
| runName | <code>string</code> | Run name |

<a name="GccSheet.setDateValidationCriteria"></a>

### GccSheet.setDateValidationCriteria(sheetName, dateHeadersRange, rowIndex, type, container, lastRow)
setDateValidationCriteria

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Apply data validation rules to all visible date cells in one row.
 This transforms TRUE/FALSE values to checkboxes and volume values to list dropdowns.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sheetName | <code>string</code> |  | Sheet name |
| dateHeadersRange | <code>Range</code> |  | Date headers range |
| rowIndex | <code>number</code> |  | Row index |
| type | <code>string</code> |  | Type (uppercase in range) |
| container | <code>object</code> |  | Instance of GccContainer |
| lastRow | <code>boolean</code> | <code>false</code> | Last row |

<a name="GccSheet.setRangeValidationCriteria"></a>

### GccSheet.setRangeValidationCriteria(range, criteriaType, criteriaValues, allowInvalid)
setRangeValidationCriteria

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Apply validation rules to a range.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>Range</code> |  | Range to add validation to |
| criteriaType | <code>string</code> |  | Criteria type |
| criteriaValues | <code>Array</code> |  | Criteria values |
| allowInvalid | <code>boolean</code> | <code>true</code> | whether to show a warning when input fails data validation or whether to reject the input entirely |

<a name="GccSheet.validateRangeValues"></a>

### GccSheet.validateRangeValues(range, replacementValues) ⇒ <code>object</code>
validateRangeValues

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Test whether the data in the range is valid according to the validation rules present.  
**Returns**: <code>object</code> - results Results  
**See**

- [runIntegrationTests](#GccTest+runIntegrationTests)
- [https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getdatavalidations](https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getdatavalidations)
- [https://stackoverflow.com/a/64993041](https://stackoverflow.com/a/64993041)
- [https://issuetracker.google.com/issues/36764218](https://issuetracker.google.com/issues/36764218)
- [https://issuetracker.google.com/issues/36763134#comment7](https://issuetracker.google.com/issues/36763134#comment7)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>Range</code> |  | Range |
| replacementValues | <code>Array</code> \| <code>null</code> | <code></code> | A two-dimensional array of replacement values, indexed by row, then by column. Prevents a runtime error when using range.setValue() to set a value which does not meet the range's data validation criteria. try .. catch cannot be used to mitigate this. |

<a name="GccSheet.validateValue"></a>

### GccSheet.validateValue(criteriaType, criteriaValues, cellRange, cellValue) ⇒ <code>object</code>
validateValue

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: Test whether a value is valid according to the validation rules supplied.  
**Returns**: <code>object</code> - result  
**See**

- [https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria?hl=en](https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria?hl=en)
- [https://stackoverflow.com/a/64993041](https://stackoverflow.com/a/64993041)
- [https://issuetracker.google.com/issues/36764218](https://issuetracker.google.com/issues/36764218)
- [https://ui.dev/validate-email-address-javascript](https://ui.dev/validate-email-address-javascript)
- [https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/](https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/)


| Param | Type | Description |
| --- | --- | --- |
| criteriaType | <code>string</code> | Criteria type |
| criteriaValues | <code>Array</code> | Criteria values |
| cellRange | <code>Range</code> | Cell range |
| cellValue | <code>\*</code> | Value to validate |

<a name="GccSheet.writeToSheetFromRunFormObject"></a>

### GccSheet.writeToSheetFromRunFormObject(formObject) ⇒ <code>string</code>
writeToSheetFromRunFormObject

**Kind**: static method of [<code>GccSheet</code>](#GccSheet)  
**Summary**: When the user selects a container volume, write the app data back to the spreadsheet.  
**Returns**: <code>string</code> - Success message for processing by the success handler in JavaScript.js.html  
**See**: [runIntegrationTests](#GccTest+runIntegrationTests)  
**Todo**

- [ ] Is the key deletion used below still necessary?


| Param | Type | Description |
| --- | --- | --- |
| formObject | <code>object</code> | Submitted form object |

<a name="GccTest"></a>

## GccTest
**Kind**: global class  
**Summary**: Properties and methods relating to testing of the codebase.  

* [GccTest](#GccTest)
    * [new GccTest(config)](#new_GccTest_new)
    * [.config](#GccTest+config) : <code>object</code>
    * [.expectations](#GccTest+expectations) : <code>object</code>
    * [.stubbedMap](#GccTest+stubbedMap) : <code>Map</code>
    * [.getCollectionInstances()](#GccTest+getCollectionInstances) ⇒ <code>Array</code>
    * [.getColorInstances()](#GccTest+getColorInstances) ⇒ <code>Array</code>
    * [.getContainerInstances()](#GccTest+getContainerInstances) ⇒ <code>Array</code>
    * [.getEnvInstances()](#GccTest+getEnvInstances) ⇒ <code>Array</code>
    * [.getPageInstances()](#GccTest+getPageInstances) ⇒ <code>Array</code>
    * [.getRunInstances()](#GccTest+getRunInstances) ⇒ <code>Array</code>
    * [.getRunGroupInstances()](#GccTest+getRunGroupInstances) ⇒ <code>Array</code>
    * [.getSheetInstances()](#GccTest+getSheetInstances) ⇒ <code>Array</code>
    * [.getUtilsInstances()](#GccTest+getUtilsInstances) ⇒ <code>Array</code>
    * [.runIntegrationTests(QUnit)](#GccTest+runIntegrationTests)
    * [.runUnitTests(QUnit)](#GccTest+runUnitTests)
    * [.stub(classMethod, args, returnValue)](#GccTest+stub)
    * [.stubGccCache()](#GccTest+stubGccCache)
    * [.stubGccCollection()](#GccTest+stubGccCollection)
    * [.stubGccEnv()](#GccTest+stubGccEnv)
    * [.stubGccRun()](#GccTest+stubGccRun)
    * [.stubGccRunGroup()](#GccTest+stubGccRunGroup)
    * [.stubGccSheet()](#GccTest+stubGccSheet)

<a name="new_GccTest_new"></a>

### new GccTest(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |

<a name="GccTest+config"></a>

### gccTest.config : <code>object</code>
config

**Kind**: instance property of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+expectations"></a>

### gccTest.expectations : <code>object</code>
expectations

**Kind**: instance property of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+stubbedMap"></a>

### gccTest.stubbedMap : <code>Map</code>
stubbedMap

**Kind**: instance property of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+getCollectionInstances"></a>

### gccTest.getCollectionInstances() ⇒ <code>Array</code>
getCollectionInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccCollection  
<a name="GccTest+getColorInstances"></a>

### gccTest.getColorInstances() ⇒ <code>Array</code>
getColorInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccColor  
<a name="GccTest+getContainerInstances"></a>

### gccTest.getContainerInstances() ⇒ <code>Array</code>
getContainerInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccContainer  
<a name="GccTest+getEnvInstances"></a>

### gccTest.getEnvInstances() ⇒ <code>Array</code>
getEnvInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccEnv  
<a name="GccTest+getPageInstances"></a>

### gccTest.getPageInstances() ⇒ <code>Array</code>
getPageInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccPage  
<a name="GccTest+getRunInstances"></a>

### gccTest.getRunInstances() ⇒ <code>Array</code>
getRunInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccRun  
<a name="GccTest+getRunGroupInstances"></a>

### gccTest.getRunGroupInstances() ⇒ <code>Array</code>
getRunGroupInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccRunGroup  
<a name="GccTest+getSheetInstances"></a>

### gccTest.getSheetInstances() ⇒ <code>Array</code>
getSheetInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccSheet  
<a name="GccTest+getUtilsInstances"></a>

### gccTest.getUtilsInstances() ⇒ <code>Array</code>
getUtilsInstances

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Returns**: <code>Array</code> - instances of GccUtils  
<a name="GccTest+runIntegrationTests"></a>

### gccTest.runIntegrationTests(QUnit)
runIntegrationTests

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Summary**: Run integration tests  

| Param | Type | Description |
| --- | --- | --- |
| QUnit | <code>object</code> | QUnit |

<a name="GccTest+runUnitTests"></a>

### gccTest.runUnitTests(QUnit)
runUnitTests

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Summary**: Run unit tests.
 Note: config object is passed into instantiations as unit tests can't access the serverside cache.  
**See**: [https://api.qunitjs.com/QUnit/module/](https://api.qunitjs.com/QUnit/module/) for setup/teardown  

| Param | Type | Description |
| --- | --- | --- |
| QUnit | <code>object</code> | QUnit |

<a name="GccTest+stub"></a>

### gccTest.stub(classMethod, args, returnValue)
stub

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
**Summary**: Stub a function in order to control its output and prevent calls to the server.  

| Param | Type | Description |
| --- | --- | --- |
| classMethod | <code>string</code> | Class.method |
| args | <code>Array</code> | Args |
| returnValue | <code>\*</code> | Return value |

**Example**  
```js
this.stub('GccCache.clearCache', [], 'Deleted cache');
```
<a name="GccTest+stubGccCache"></a>

### gccTest.stubGccCache()
stubGccCache

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+stubGccCollection"></a>

### gccTest.stubGccCollection()
stubGccCollection

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+stubGccEnv"></a>

### gccTest.stubGccEnv()
stubGccEnv

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+stubGccRun"></a>

### gccTest.stubGccRun()
stubGccRun

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+stubGccRunGroup"></a>

### gccTest.stubGccRunGroup()
stubGccRunGroup

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
<a name="GccTest+stubGccSheet"></a>

### gccTest.stubGccSheet()
stubGccSheet

**Kind**: instance method of [<code>GccTest</code>](#GccTest)  
<a name="GccUi"></a>

## GccUi
**Kind**: global class  
**Summary**: UI helpers.  
**Access**: public  

* [GccUi](#GccUi)
    * [new GccUi(config)](#new_GccUi_new)
    * _instance_
        * [.focusableSelector](#GccUi+focusableSelector) : <code>string</code>
        * [.instance](#GccUi+instance) : [<code>GccUi</code>](#GccUi)
        * [.enableActiveStates(parentSelector)](#GccUi+enableActiveStates)
    * _static_
        * [.createCustomEvent(eventName)](#GccUi.createCustomEvent) ⇒ <code>\*</code>
        * [.getInstance(config)](#GccUi.getInstance) ⇒ [<code>GccUi</code>](#GccUi)
        * [.log(str)](#GccUi.log)

<a name="new_GccUi_new"></a>

### new GccUi(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiFocusableSelectors | <code>Array</code> | UI elements which can be focussed by the user. |

<a name="GccUi+focusableSelector"></a>

### gccUi.focusableSelector : <code>string</code>
focusableSelector

**Kind**: instance property of [<code>GccUi</code>](#GccUi)  
<a name="GccUi+instance"></a>

### gccUi.instance : [<code>GccUi</code>](#GccUi)
instance

**Kind**: instance property of [<code>GccUi</code>](#GccUi)  
<a name="GccUi+enableActiveStates"></a>

### gccUi.enableActiveStates(parentSelector)
enableActiveStates

**Kind**: instance method of [<code>GccUi</code>](#GccUi)  
**Summary**: Fix for iOS which does not apply the active state by default, applied per-element for better performance  
**See**

- [https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios](https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios)
- [http://stackoverflow.com/a/28771425](http://stackoverflow.com/a/28771425)
- [https://codepen.io/dotherightthingnz/pen/bGwaGmM](https://codepen.io/dotherightthingnz/pen/bGwaGmM)


| Param | Type | Description |
| --- | --- | --- |
| parentSelector | <code>string</code> | Parent selector |

<a name="GccUi.createCustomEvent"></a>

### GccUi.createCustomEvent(eventName) ⇒ <code>\*</code>
createCustomEvent

**Kind**: static method of [<code>GccUi</code>](#GccUi)  
**Summary**: Create a synthetic event which can be triggered and which will then invoke the element's matching event listener  
**Returns**: <code>\*</code> - CustomEvent  
**See**: [https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Event name |

<a name="GccUi.getInstance"></a>

### GccUi.getInstance(config) ⇒ [<code>GccUi</code>](#GccUi)
getInstance

**Kind**: static method of [<code>GccUi</code>](#GccUi)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUi</code>](#GccUi) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccUi.log"></a>

### GccUi.log(str)
log

**Kind**: static method of [<code>GccUi</code>](#GccUi)  
**Summary**: Log a string to the console  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to log |

<a name="GccUiCollection"></a>

## GccUiCollection
**Kind**: global class  
**Access**: public  

* [GccUiCollection](#GccUiCollection)
    * [new GccUiCollection(config)](#new_GccUiCollection_new)
    * _instance_
        * [.abbreviations](#GccUiCollection+abbreviations) : <code>Array</code>
        * [.address](#GccUiCollection+address) : <code>string</code>
        * [.cancelled](#GccUiCollection+cancelled) : <code>boolean</code>
        * [.collect](#GccUiCollection+collect) : <code>boolean</code>
        * [.collectionMapLocale](#GccUiCollection+collectionMapLocale) : <code>string</code>
        * [.collectionStatus](#GccUiCollection+collectionStatus) : <code>string</code>
        * [.containerQuantity](#GccUiCollection+containerQuantity) : <code>number</code>
        * [.containerType](#GccUiCollection+containerType) : <code>string</code>
        * [.dateFlag](#GccUiCollection+dateFlag) : <code>string</code>
        * [.dateValue](#GccUiCollection+dateValue) : <code>number</code> \| <code>string</code> \| <code>boolean</code>
        * [.index](#GccUiCollection+index) : <code>number</code>
        * [.groupActiveIndex](#GccUiCollection+groupActiveIndex) : <code>number</code>
        * [.groupTotal](#GccUiCollection+groupTotal) : <code>number</code>
        * [.name](#GccUiCollection+name) : <code>string</code>
        * [.notes](#GccUiCollection+notes) : <code>string</code>
        * [.onHold](#GccUiCollection+onHold) : <code>boolean</code>
        * [.pending](#GccUiCollection+pending) : <code>boolean</code>
        * [.runDate](#GccUiCollection+runDate) : <code>string</code>
        * [.runName](#GccUiCollection+runName) : <code>string</code>
        * [.type](#GccUiCollection+type) : <code>string</code>
        * [.typeDefinition](#GccUiCollection+typeDefinition) : <code>string</code>
        * [.volumesAndDateFlags](#GccUiCollection+volumesAndDateFlags) : <code>null</code> \| <code>Array</code>
        * [.editNotesStart(element)](#GccUiCollection+editNotesStart)
        * [.editNotesEnd(element)](#GccUiCollection+editNotesEnd)
        * [.getAddressUrl(address, collectionMapLocale)](#GccUiCollection+getAddressUrl) ⇒ <code>string</code>
        * [.getChecklistItemHtml(collectionId, inputId, targetStateId)](#GccUiCollection+getChecklistItemHtml) ⇒ <code>string</code>
        * [.getCollectionHtml()](#GccUiCollection+getCollectionHtml) ⇒ <code>string</code>
        * [.getCollectionStatus()](#GccUiCollection+getCollectionStatus) ⇒ <code>string</code>
        * [.getContainerHtml()](#GccUiCollection+getContainerHtml) ⇒ <code>string</code>
        * [.getDisclosureButtonHtml(disclosureId, targetStateId)](#GccUiCollection+getDisclosureButtonHtml) ⇒ <code>string</code>
        * [.getLegendHtml(notesId)](#GccUiCollection+getLegendHtml) ⇒ <code>string</code>
        * [.getNotesHtml(notesId, targetStateId)](#GccUiCollection+getNotesHtml) ⇒ <code>string</code>
        * [.getSelectHtml(collectionId, inputId, targetStateId)](#GccUiCollection+getSelectHtml) ⇒ <code>string</code>
        * [.getSelectionHtml(collectionId)](#GccUiCollection+getSelectionHtml) ⇒ <code>string</code>
        * [.getTargetInput(element)](#GccUiCollection+getTargetInput) ⇒ <code>HTMLElement</code>
        * [.getTypeDefinition()](#GccUiCollection+getTypeDefinition) ⇒ <code>string</code>
        * [.linkPhoneNumbers(text)](#GccUiCollection+linkPhoneNumbers) ⇒ <code>string</code>
        * [.updateCheckedState(element)](#GccUiCollection+updateCheckedState)
        * [.updateCollectionColor(element)](#GccUiCollection+updateCollectionColor)
        * [.updateCollectionSelection(element)](#GccUiCollection+updateCollectionSelection)
    * _static_
        * [.getSourceInput(element)](#GccUiCollection.getSourceInput) ⇒ <code>HTMLElement</code>
        * [.isCheckbox(element)](#GccUiCollection.isCheckbox) ⇒ <code>boolean</code>

<a name="new_GccUiCollection_new"></a>

### new GccUiCollection(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.abbreviations | <code>Array</code> | Abbreviations and their expansions (used to accessibly expand collection types). |
| config.address | <code>string</code> | Street address of collection. |
| config.cancelled | <code>boolean</code> | Whether the collection is permanently cancelled. |
| config.collect | <code>boolean</code> | Whether the collection should be collected. |
| config.collectionMapLocale | <code>string</code> | Map locale to append to Google Maps lookups. |
| config.containerQuantity | <code>number</code> | Quantity of containers to collect. |
| config.containerType | <code>string</code> | Type of container to collect. |
| config.dateFlag | <code>string</code> | Any special instructions for the collection on a particular collection date (Skip, Drop, etc). |
| config.dateValue | <code>number</code> \| <code>string</code> \| <code>boolean</code> | Recorded collection amount or status or checkbox state for a particular collection date. |
| config.editableToggleClass | <code>string</code> | Class selector used by the notes edit buttons. |
| config.groupActiveIndex | <code>number</code> | Index of this instance within a group of collections (the 'active count'). |
| config.groupTotal | <code>number</code> | Total number of instance within a group of collections. |
| config.loopIndex | <code>number</code> | Index of this instance within a group of collections. |
| config.name | <code>string</code> | The name of the customer. |
| config.notes | <code>string</code> | General notes about this collection, such as where to find the container or how to contact the customer. |
| config.onHold | <code>boolean</code> | Whether the collection is temporarily on hold. |
| config.pending | <code>boolean</code> | Whether the collection is yet to begin. |
| config.runDate | <code>string</code> | The date of the collection. |
| config.runName | <code>string</code> | The name of the parent run. |
| config.type | <code>string</code> | The type of customer. |
| config.volumesAndDateFlags | <code>Array</code> \| <code>null</code> | Volumes and date flags. |

<a name="GccUiCollection+abbreviations"></a>

### gccUiCollection.abbreviations : <code>Array</code>
abbreviations

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+address"></a>

### gccUiCollection.address : <code>string</code>
address

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+cancelled"></a>

### gccUiCollection.cancelled : <code>boolean</code>
cancelled

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+collect"></a>

### gccUiCollection.collect : <code>boolean</code>
collect

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+collectionMapLocale"></a>

### gccUiCollection.collectionMapLocale : <code>string</code>
collectionMapLocale

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+collectionStatus"></a>

### gccUiCollection.collectionStatus : <code>string</code>
collectionStatus

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+containerQuantity"></a>

### gccUiCollection.containerQuantity : <code>number</code>
containerQuantity

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+containerType"></a>

### gccUiCollection.containerType : <code>string</code>
containerType

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+dateFlag"></a>

### gccUiCollection.dateFlag : <code>string</code>
dateFlag

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+dateValue"></a>

### gccUiCollection.dateValue : <code>number</code> \| <code>string</code> \| <code>boolean</code>
dateValue

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+index"></a>

### gccUiCollection.index : <code>number</code>
index

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+groupActiveIndex"></a>

### gccUiCollection.groupActiveIndex : <code>number</code>
groupActiveIndex

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+groupTotal"></a>

### gccUiCollection.groupTotal : <code>number</code>
groupTotal

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+name"></a>

### gccUiCollection.name : <code>string</code>
name

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+notes"></a>

### gccUiCollection.notes : <code>string</code>
notes

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+onHold"></a>

### gccUiCollection.onHold : <code>boolean</code>
onHold

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+pending"></a>

### gccUiCollection.pending : <code>boolean</code>
pending

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+runDate"></a>

### gccUiCollection.runDate : <code>string</code>
runDate

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+runName"></a>

### gccUiCollection.runName : <code>string</code>
runName

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+type"></a>

### gccUiCollection.type : <code>string</code>
type

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+typeDefinition"></a>

### gccUiCollection.typeDefinition : <code>string</code>
typeDefinition

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+volumesAndDateFlags"></a>

### gccUiCollection.volumesAndDateFlags : <code>null</code> \| <code>Array</code>
volumesAndDateFlags

**Kind**: instance property of [<code>GccUiCollection</code>](#GccUiCollection)  
<a name="GccUiCollection+editNotesStart"></a>

### gccUiCollection.editNotesStart(element)
editNotesStart

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: User starts editing of notes  
**See**: [https://stackoverflow.com/a/70565696/6850747](https://stackoverflow.com/a/70565696/6850747)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection+editNotesEnd"></a>

### gccUiCollection.editNotesEnd(element)
editNotesEnd

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: User starts editing of notes  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection+getAddressUrl"></a>

### gccUiCollection.getAddressUrl(address, collectionMapLocale) ⇒ <code>string</code>
getAddressUrl

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate a link to the collection address using Google Maps.  
**Returns**: <code>string</code> - URL  
**See**: [https://gearside.com/easily-link-to-locations-and-directions-using-the-new-google-maps/](https://gearside.com/easily-link-to-locations-and-directions-using-the-new-google-maps/)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address |
| collectionMapLocale | <code>string</code> | Map locale |

<a name="GccUiCollection+getChecklistItemHtml"></a>

### gccUiCollection.getChecklistItemHtml(collectionId, inputId, targetStateId) ⇒ <code>string</code>
getChecklistItemHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection checkbox. Checked attribute set by GccUiRunForm.populateForm.  
**Returns**: <code>string</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| collectionId | <code>string</code> | Collection ID |
| inputId | <code>string</code> | Input ID |
| targetStateId | <code>string</code> | State proxy ID |

<a name="GccUiCollection+getCollectionHtml"></a>

### gccUiCollection.getCollectionHtml() ⇒ <code>string</code>
getCollectionHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection area of the collection.  
**Returns**: <code>string</code> - html  
<a name="GccUiCollection+getCollectionStatus"></a>

### gccUiCollection.getCollectionStatus() ⇒ <code>string</code>
getCollectionStatus

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Returns**: <code>string</code> - collectionStatus  
<a name="GccUiCollection+getContainerHtml"></a>

### gccUiCollection.getContainerHtml() ⇒ <code>string</code>
getContainerHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the container area of the collection.  
**Returns**: <code>string</code> - html  
<a name="GccUiCollection+getDisclosureButtonHtml"></a>

### gccUiCollection.getDisclosureButtonHtml(disclosureId, targetStateId) ⇒ <code>string</code>
getDisclosureButtonHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection disclosure button  
**Returns**: <code>string</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| disclosureId | <code>string</code> | Disclosure ID |
| targetStateId | <code>string</code> | State proxy ID |

<a name="GccUiCollection+getLegendHtml"></a>

### gccUiCollection.getLegendHtml(notesId) ⇒ <code>string</code>
getLegendHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection legend  
**Returns**: <code>string</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| notesId | <code>string</code> | Notes ID |

<a name="GccUiCollection+getNotesHtml"></a>

### gccUiCollection.getNotesHtml(notesId, targetStateId) ⇒ <code>string</code>
getNotesHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection notes area.  
**Returns**: <code>string</code> - html  
**Todo**

- [ ] date flag disappears after user input is written to then read from spreadsheet (#193)


| Param | Type | Description |
| --- | --- | --- |
| notesId | <code>string</code> | Notes ID |
| targetStateId | <code>string</code> | State proxy ID |

<a name="GccUiCollection+getSelectHtml"></a>

### gccUiCollection.getSelectHtml(collectionId, inputId, targetStateId) ⇒ <code>string</code>
getSelectHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection volume select. Values are set by GccUiRunForm.populateForm.  
**Returns**: <code>string</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| collectionId | <code>string</code> | Collection ID |
| inputId | <code>string</code> | Input ID |
| targetStateId | <code>string</code> | State proxy ID |

<a name="GccUiCollection+getSelectionHtml"></a>

### gccUiCollection.getSelectionHtml(collectionId) ⇒ <code>string</code>
getSelectionHtml

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Generate the HTML for the collection selection output area.  
**Returns**: <code>string</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| collectionId | <code>string</code> | Collection ID |

<a name="GccUiCollection+getTargetInput"></a>

### gccUiCollection.getTargetInput(element) ⇒ <code>HTMLElement</code>
getTargetInput

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Get the HTML element which the supplied element targets.
 This allows the user to affect element B by interacting with element A.  
**Returns**: <code>HTMLElement</code> - targetInputEl Target element  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection+getTypeDefinition"></a>

### gccUiCollection.getTypeDefinition() ⇒ <code>string</code>
getTypeDefinition

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Get the expanded form of a type abbreviation used in the spreadsheet.  
**Returns**: <code>string</code> - definition  
**See**: [runUnitTests](#GccTest+runUnitTests)  
<a name="GccUiCollection+linkPhoneNumbers"></a>

### gccUiCollection.linkPhoneNumbers(text) ⇒ <code>string</code>
linkPhoneNumbers

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Link phone numbers in a body of text.  
**Returns**: <code>string</code> - linkedText  
**See**: [https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand](https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text |

<a name="GccUiCollection+updateCheckedState"></a>

### gccUiCollection.updateCheckedState(element)
updateCheckedState

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Transform the :checked UI state to a :value that the server can understand (true|false)
 and so that the value is always submitted to the server irrespective of the :checked state.  
**Todo**

- [ ] Does this need to be bidirectional?


| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection+updateCollectionColor"></a>

### gccUiCollection.updateCollectionColor(element)
updateCollectionColor

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Update the collection colour scheme to reflect the current selection  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection+updateCollectionSelection"></a>

### gccUiCollection.updateCollectionSelection(element)
updateCollectionSelection

**Kind**: instance method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Update the visible selection output to reflect the current selection  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection.getSourceInput"></a>

### GccUiCollection.getSourceInput(element) ⇒ <code>HTMLElement</code>
getSourceInput

**Kind**: static method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Get the HTML element which targets the supplied element.
 This allows the user to affect (hidden) element B by interacting with (visible) element A.  
**Returns**: <code>HTMLElement</code> - sourceInputEl Target element  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCollection.isCheckbox"></a>

### GccUiCollection.isCheckbox(element) ⇒ <code>boolean</code>
isCheckbox

**Kind**: static method of [<code>GccUiCollection</code>](#GccUiCollection)  
**Summary**: Determine whether an element is a checkbox  
**Returns**: <code>boolean</code> - isCheckbox  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | HTML Element |

<a name="GccUiCss"></a>

## GccUiCss
**Kind**: global class  
**Summary**: Manage dynamic CSS  
**Access**: public  

* [GccUiCss](#GccUiCss)
    * [new GccUiCss(config)](#new_GccUiCss_new)
    * _instance_
        * [.fixedPositionIds](#GccUiCss+fixedPositionIds) : <code>Array</code>
        * [.instance](#GccUiCss+instance) : [<code>GccUiCss</code>](#GccUiCss)
        * [.injectHeightVariables()](#GccUiCss+injectHeightVariables)
    * _static_
        * [.getInstance(config)](#GccUiCss.getInstance) ⇒ [<code>GccUiCss</code>](#GccUiCss)

<a name="new_GccUiCss_new"></a>

### new GccUiCss(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiCss | <code>object</code> | Module configuration. |
| config.uiCss.fixedPositionIds | <code>Array</code> | IDs of elements that use fixed positioning, used to generate CSS variables. |

<a name="GccUiCss+fixedPositionIds"></a>

### gccUiCss.fixedPositionIds : <code>Array</code>
fixedPositionIds

**Kind**: instance property of [<code>GccUiCss</code>](#GccUiCss)  
<a name="GccUiCss+instance"></a>

### gccUiCss.instance : [<code>GccUiCss</code>](#GccUiCss)
instance

**Kind**: instance property of [<code>GccUiCss</code>](#GccUiCss)  
<a name="GccUiCss+injectHeightVariables"></a>

### gccUiCss.injectHeightVariables()
injectHeightVariables

**Kind**: instance method of [<code>GccUiCss</code>](#GccUiCss)  
**Summary**: Store heights of fixed position elements  
<a name="GccUiCss.getInstance"></a>

### GccUiCss.getInstance(config) ⇒ [<code>GccUiCss</code>](#GccUiCss)
getInstance

**Kind**: static method of [<code>GccUiCss</code>](#GccUiCss)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUiCss</code>](#GccUiCss) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccUiDialog"></a>

## GccUiDialog
**Kind**: global class  
**Summary**: Show a different screen, without triggering a page reload (which would lose the fullscreen effect)
 or otherwise affecting the underlying page state.  
**Access**: public  
**See**: [https://www.w3.org/TR/wai-aria-practices/#dialog_modal](https://www.w3.org/TR/wai-aria-practices/#dialog_modal)  

* [GccUiDialog](#GccUiDialog)
    * [new GccUiDialog(config)](#new_GccUiDialog_new)
    * _instance_
        * [.cacheClearButtonId](#GccUiDialog+cacheClearButtonId) : <code>string</code>
        * [.cacheLogButtonId](#GccUiDialog+cacheLogButtonId) : <code>string</code>
        * [.closeClass](#GccUiDialog+closeClass) : <code>string</code>
        * [.componentClass](#GccUiDialog+componentClass) : <code>string</code>
        * [.consoleContainerId](#GccUiDialog+consoleContainerId) : <code>string</code>
        * [.endClass](#GccUiDialog+endClass) : <code>string</code>
        * [.erudaScriptId](#GccUiDialog+erudaScriptId) : <code>string</code>
        * [.focusableSelector](#GccUiDialog+focusableSelector) : <code>string</code>
        * [.instance](#GccUiDialog+instance) : [<code>GccUiDialog</code>](#GccUiDialog)
        * [.parentDataAttr](#GccUiDialog+parentDataAttr) : <code>string</code>
        * [.startClass](#GccUiDialog+startClass) : <code>string</code>
        * [.triggerClass](#GccUiDialog+triggerClass) : <code>string</code>
        * [.updateDateValidationId](#GccUiDialog+updateDateValidationId) : <code>string</code>
        * [.init()](#GccUiDialog+init)
        * [.cacheClear()](#GccUiDialog+cacheClear)
        * [.logCache()](#GccUiDialog+logCache)
        * [.handleClick(event)](#GccUiDialog+handleClick)
        * [.handleFocusTrap(event)](#GccUiDialog+handleFocusTrap)
        * [.handleKeyDown(event)](#GccUiDialog+handleKeyDown)
        * [.hide()](#GccUiDialog+hide)
        * [.injectConsole()](#GccUiDialog+injectConsole)
        * [.setDateValidation()](#GccUiDialog+setDateValidation)
        * [.show(triggerEl)](#GccUiDialog+show)
    * _static_
        * [.getInstance(config)](#GccUiDialog.getInstance) ⇒ [<code>GccUiDialog</code>](#GccUiDialog)

<a name="new_GccUiDialog_new"></a>

### new GccUiDialog(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiDialog | <code>object</code> | Module configuration. |
| config.uiDialogCacheClearButtonId | <code>string</code> | ID selector used to target the Clear Cache button |
| config.uiDialogCacheLogButtonId | <code>string</code> | ID selector used to target the Log Cache button |
| config.uiDialogCloseClass | <code>string</code> | Class selector of button that hides the component |
| config.uiDialogComponentClass | <code>string</code> | Class selector of component |
| config.uiDialogConsoleContainerId | <code>string</code> | ID selector of console container |
| config.uiDialogErudaScriptId | <code>string</code> | ID selector of eruda script element |
| config.uiDialogParentDataAttr | <code>string</code> | Data attribute used to manage state of parent element |
| config.uiDialogTriggerClass | <code>string</code> | Class selector of button that shows the component |
| config.uiDialogUpdateDateValidationId | <code>string</code> | ID selector used to target the Refresh collection inputs button |
| config.uiFocusableSelectors | <code>Array</code> | UI elements which can be focussed by the user. |

<a name="GccUiDialog+cacheClearButtonId"></a>

### gccUiDialog.cacheClearButtonId : <code>string</code>
cacheClearButtonId

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+cacheLogButtonId"></a>

### gccUiDialog.cacheLogButtonId : <code>string</code>
cacheLogButtonId

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+closeClass"></a>

### gccUiDialog.closeClass : <code>string</code>
closeClass

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+componentClass"></a>

### gccUiDialog.componentClass : <code>string</code>
componentClass

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+consoleContainerId"></a>

### gccUiDialog.consoleContainerId : <code>string</code>
consoleContainerId

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+endClass"></a>

### gccUiDialog.endClass : <code>string</code>
endClass

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+erudaScriptId"></a>

### gccUiDialog.erudaScriptId : <code>string</code>
erudaScriptId

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+focusableSelector"></a>

### gccUiDialog.focusableSelector : <code>string</code>
focusableSelector

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+instance"></a>

### gccUiDialog.instance : [<code>GccUiDialog</code>](#GccUiDialog)
instance

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+parentDataAttr"></a>

### gccUiDialog.parentDataAttr : <code>string</code>
parentDataAttr

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+startClass"></a>

### gccUiDialog.startClass : <code>string</code>
startClass

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+triggerClass"></a>

### gccUiDialog.triggerClass : <code>string</code>
triggerClass

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+updateDateValidationId"></a>

### gccUiDialog.updateDateValidationId : <code>string</code>
updateDateValidationId

**Kind**: instance property of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+init"></a>

### gccUiDialog.init()
init

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+cacheClear"></a>

### gccUiDialog.cacheClear()
cacheClear

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Clear the contents of the cache  
<a name="GccUiDialog+logCache"></a>

### gccUiDialog.logCache()
logCache

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Log the contents of the cache  
<a name="GccUiDialog+handleClick"></a>

### gccUiDialog.handleClick(event)
handleClick

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Handle clicks/touches  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiDialog+handleFocusTrap"></a>

### gccUiDialog.handleFocusTrap(event)
handleFocusTrap

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Prevent user from tabbing outside the dialog  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiDialog+handleKeyDown"></a>

### gccUiDialog.handleKeyDown(event)
handleKeyDown

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Handle key presses  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiDialog+hide"></a>

### gccUiDialog.hide()
hide

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Hide the dialog.  
<a name="GccUiDialog+injectConsole"></a>

### gccUiDialog.injectConsole()
Inject console

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
<a name="GccUiDialog+setDateValidation"></a>

### gccUiDialog.setDateValidation()
setDateValidation

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Apply data validation rules to all visible date cells in all rows.  
<a name="GccUiDialog+show"></a>

### gccUiDialog.show(triggerEl)
show

**Kind**: instance method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Show the dialog.  

| Param | Type | Description |
| --- | --- | --- |
| triggerEl | <code>HTMLElement</code> | The element (button) which triggered the show. |

<a name="GccUiDialog.getInstance"></a>

### GccUiDialog.getInstance(config) ⇒ [<code>GccUiDialog</code>](#GccUiDialog)
getInstance

**Kind**: static method of [<code>GccUiDialog</code>](#GccUiDialog)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUiDialog</code>](#GccUiDialog) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccUiLoader"></a>

## GccUiLoader
**Kind**: global class  
**Summary**: Toggle a loading animation  
**Access**: public  

* [GccUiLoader](#GccUiLoader)
    * [new GccUiLoader(config)](#new_GccUiLoader_new)
    * _instance_
        * [.instance](#GccUiLoader+instance) : [<code>GccUiLoader</code>](#GccUiLoader)
        * [.componentClass](#GccUiLoader+componentClass) : <code>string</code>
        * [.dataAttr](#GccUiLoader+dataAttr) : <code>string</code>
        * [.descriptionClass](#GccUiLoader+descriptionClass) : <code>string</code>
        * [.hideDelay](#GccUiLoader+hideDelay) : <code>number</code>
        * [.parentDataAttr](#GccUiLoader+parentDataAttr) : <code>string</code>
        * [.runLoaderId](#GccUiLoader+runLoaderId) : <code>string</code>
        * [.runSaverId](#GccUiLoader+runSaverId) : <code>string</code>
        * [.titleClass](#GccUiLoader+titleClass) : <code>string</code>
        * [.show(loaderId, isLoading, [title], [description])](#GccUiLoader+show)
    * _static_
        * [.getInstance(config)](#GccUiLoader.getInstance) ⇒ [<code>GccUiLoader</code>](#GccUiLoader)

<a name="new_GccUiLoader_new"></a>

### new GccUiLoader(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiLoader | <code>object</code> | Module configuration. |
| config.uiLoader.componentClass | <code>string</code> | Class selector of the loader element |
| config.uiLoader.dataAttr | <code>string</code> | Data attribute used to manage state |
| config.uiLoader.descriptionClass | <code>string</code> | Class selector of the loader description |
| config.uiLoader.hideDelay | <code>number</code> | Number of milliseconds to wait before hiding the loader |
| config.uiLoader.parentDataAttr | <code>string</code> | Data attribute used to manage state of parent element |
| config.uiLoader.runLoaderId | <code>string</code> | ID selector of the loader component that appears in the overlay |
| config.uiLoader.runSaverId | <code>string</code> | ID selector of the loader component that appears save status bar |
| config.uiLoader.titleClass | <code>string</code> | Class selector of the loader title |

<a name="GccUiLoader+instance"></a>

### gccUiLoader.instance : [<code>GccUiLoader</code>](#GccUiLoader)
instance

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+componentClass"></a>

### gccUiLoader.componentClass : <code>string</code>
componentClass

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+dataAttr"></a>

### gccUiLoader.dataAttr : <code>string</code>
dataAttr

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+descriptionClass"></a>

### gccUiLoader.descriptionClass : <code>string</code>
descriptionClass

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+hideDelay"></a>

### gccUiLoader.hideDelay : <code>number</code>
hideDelay

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+parentDataAttr"></a>

### gccUiLoader.parentDataAttr : <code>string</code>
parentDataAttr

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+runLoaderId"></a>

### gccUiLoader.runLoaderId : <code>string</code>
runLoaderId

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+runSaverId"></a>

### gccUiLoader.runSaverId : <code>string</code>
runSaverId

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+titleClass"></a>

### gccUiLoader.titleClass : <code>string</code>
titleClass

**Kind**: instance property of [<code>GccUiLoader</code>](#GccUiLoader)  
<a name="GccUiLoader+show"></a>

### gccUiLoader.show(loaderId, isLoading, [title], [description])
show

Hide or show the loader (icon visibility is set in CSS).

**Kind**: instance method of [<code>GccUiLoader</code>](#GccUiLoader)  
**See**: [https://loading.io/css/](https://loading.io/css/)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| loaderId | <code>string</code> |  | Loader ID (runLoaderId or runSaverId depending on context) |
| isLoading | <code>string</code> |  | Loading state (true|false|error) |
| [title] | <code>string</code> | <code>null</code> | Visible title |
| [description] | <code>string</code> | <code>null</code> | Visible description |

<a name="GccUiLoader.getInstance"></a>

### GccUiLoader.getInstance(config) ⇒ [<code>GccUiLoader</code>](#GccUiLoader)
getInstance

**Kind**: static method of [<code>GccUiLoader</code>](#GccUiLoader)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUiLoader</code>](#GccUiLoader) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccUiRun"></a>

## GccUiRun
**Kind**: global class  
**Access**: public  

* [GccUiRun](#GccUiRun)
    * [new GccUiRun(config)](#new_GccUiRun_new)
    * [.bucketsTotal](#GccUiRun+bucketsTotal) : <code>number</code> \| <code>string</code>
    * [.collections](#GccUiRun+collections) : <code>Array</code>
    * [.collectionsActiveTotal](#GccUiRun+collectionsActiveTotal) : <code>number</code>
    * [.date](#GccUiRun+date) : <code>string</code>
    * [.name](#GccUiRun+name) : <code>string</code>
    * [.tubsTotal](#GccUiRun+tubsTotal) : <code>number</code>
    * [.getTotalActiveCollections()](#GccUiRun+getTotalActiveCollections) ⇒ <code>number</code>
    * [.getTotalBuckets()](#GccUiRun+getTotalBuckets) ⇒ <code>number</code> \| <code>string</code>
    * [.getTotalTubs()](#GccUiRun+getTotalTubs) ⇒ <code>number</code>
    * [.getRunHeaderHtml()](#GccUiRun+getRunHeaderHtml) ⇒ <code>string</code>

<a name="new_GccUiRun_new"></a>

### new GccUiRun(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.collections | <code>Array</code> | Collection points on the run. |
| config.date | <code>string</code> | Date of the run |
| config.name | <code>string</code> | Name of the run |

<a name="GccUiRun+bucketsTotal"></a>

### gccUiRun.bucketsTotal : <code>number</code> \| <code>string</code>
bucketsTotal

**Kind**: instance property of [<code>GccUiRun</code>](#GccUiRun)  
<a name="GccUiRun+collections"></a>

### gccUiRun.collections : <code>Array</code>
collections

**Kind**: instance property of [<code>GccUiRun</code>](#GccUiRun)  
<a name="GccUiRun+collectionsActiveTotal"></a>

### gccUiRun.collectionsActiveTotal : <code>number</code>
collectionsActiveTotal

**Kind**: instance property of [<code>GccUiRun</code>](#GccUiRun)  
<a name="GccUiRun+date"></a>

### gccUiRun.date : <code>string</code>
date

**Kind**: instance property of [<code>GccUiRun</code>](#GccUiRun)  
<a name="GccUiRun+name"></a>

### gccUiRun.name : <code>string</code>
name

**Kind**: instance property of [<code>GccUiRun</code>](#GccUiRun)  
<a name="GccUiRun+tubsTotal"></a>

### gccUiRun.tubsTotal : <code>number</code>
tubsTotal

**Kind**: instance property of [<code>GccUiRun</code>](#GccUiRun)  
<a name="GccUiRun+getTotalActiveCollections"></a>

### gccUiRun.getTotalActiveCollections() ⇒ <code>number</code>
getTotalActiveCollections

**Kind**: instance method of [<code>GccUiRun</code>](#GccUiRun)  
**Returns**: <code>number</code> - collectionsActiveTotal  
<a name="GccUiRun+getTotalBuckets"></a>

### gccUiRun.getTotalBuckets() ⇒ <code>number</code> \| <code>string</code>
getTotalBuckets

**Kind**: instance method of [<code>GccUiRun</code>](#GccUiRun)  
**Returns**: <code>number</code> \| <code>string</code> - bucketsTotal  
<a name="GccUiRun+getTotalTubs"></a>

### gccUiRun.getTotalTubs() ⇒ <code>number</code>
getTotalTubs

**Kind**: instance method of [<code>GccUiRun</code>](#GccUiRun)  
**Returns**: <code>number</code> - tubsTotal  
<a name="GccUiRun+getRunHeaderHtml"></a>

### gccUiRun.getRunHeaderHtml() ⇒ <code>string</code>
getRunHeaderHtml

**Kind**: instance method of [<code>GccUiRun</code>](#GccUiRun)  
**Summary**: Generate the HTML for the run header.  
**Returns**: <code>string</code> - html  
<a name="GccUiRunForm"></a>

## GccUiRunForm
**Kind**: global class  
**Access**: public  

* [GccUiRunForm](#GccUiRunForm)
    * [new GccUiRunForm(config)](#new_GccUiRunForm_new)
    * _instance_
        * [.collectionsId](#GccUiRunForm+collectionsId) : <code>string</code>
        * [.id](#GccUiRunForm+id) : <code>string</code>
        * [.instance](#GccUiRunForm+instance) : [<code>GccUiRunForm</code>](#GccUiRunForm)
        * [.placeholderLogoClass](#GccUiRunForm+placeholderLogoClass) : <code>string</code>
        * [.runId](#GccUiRunForm+runId) : <code>string</code>
        * [.getCollectionsHtml(data)](#GccUiRunForm+getCollectionsHtml) ⇒ <code>string</code>
        * [.init()](#GccUiRunForm+init)
        * [.handleChange(event)](#GccUiRunForm+handleChange)
        * [.handleClick(event)](#GccUiRunForm+handleClick)
        * [.handleSubmit(event)](#GccUiRunForm+handleSubmit)
        * [.handleSubmitFailCb(serverResponse)](#GccUiRunForm+handleSubmitFailCb)
        * [.handleSubmitSuccessCb()](#GccUiRunForm+handleSubmitSuccessCb)
        * [.injectTemplate(data)](#GccUiRunForm+injectTemplate)
        * [.populateForm(data)](#GccUiRunForm+populateForm)
        * [.reset()](#GccUiRunForm+reset)
        * [.showPlaceholderLogo(show)](#GccUiRunForm+showPlaceholderLogo)
    * _static_
        * [.getInstance(config)](#GccUiRunForm.getInstance) ⇒ [<code>GccUiRunForm</code>](#GccUiRunForm)

<a name="new_GccUiRunForm_new"></a>

### new GccUiRunForm(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiRunForm | <code>object</code> | Module configuration. |
| config.uiRunForm.collectionsId | <code>string</code> | ID selector used to target the collections container |
| config.uiRunForm.id | <code>string</code> | ID selector used to target the run form |
| config.uiRunForm.placeholderLogoClass | <code>string</code> | Class selector which applies the background logo |
| config.uiRunForm.runId | <code>string</code> | ID selector of the run component |

<a name="GccUiRunForm+collectionsId"></a>

### gccUiRunForm.collectionsId : <code>string</code>
collectionsId

**Kind**: instance property of [<code>GccUiRunForm</code>](#GccUiRunForm)  
<a name="GccUiRunForm+id"></a>

### gccUiRunForm.id : <code>string</code>
id

**Kind**: instance property of [<code>GccUiRunForm</code>](#GccUiRunForm)  
<a name="GccUiRunForm+instance"></a>

### gccUiRunForm.instance : [<code>GccUiRunForm</code>](#GccUiRunForm)
instance

**Kind**: instance property of [<code>GccUiRunForm</code>](#GccUiRunForm)  
<a name="GccUiRunForm+placeholderLogoClass"></a>

### gccUiRunForm.placeholderLogoClass : <code>string</code>
placeholderLogoClass

**Kind**: instance property of [<code>GccUiRunForm</code>](#GccUiRunForm)  
<a name="GccUiRunForm+runId"></a>

### gccUiRunForm.runId : <code>string</code>
runId

**Kind**: instance property of [<code>GccUiRunForm</code>](#GccUiRunForm)  
<a name="GccUiRunForm+getCollectionsHtml"></a>

### gccUiRunForm.getCollectionsHtml(data) ⇒ <code>string</code>
getCollectionsHtml

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Instances of GccCollection (backend) are converted to objects
 and passed to the frontend where they are processed by GccUiCollection (frontend)  
**Returns**: <code>string</code> - html  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Pubsub data |

<a name="GccUiRunForm+init"></a>

### gccUiRunForm.init()
init

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Runs every time a new run form is selected/loaded.  
<a name="GccUiRunForm+handleChange"></a>

### gccUiRunForm.handleChange(event)
handleChange

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiRunForm+handleClick"></a>

### gccUiRunForm.handleClick(event)
handleClick

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiRunForm+handleSubmit"></a>

### gccUiRunForm.handleSubmit(event)
handleSubmit

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**See**: [https://developers.google.com/apps-script/guides/html/communication#index.html_4](https://developers.google.com/apps-script/guides/html/communication#index.html_4)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiRunForm+handleSubmitFailCb"></a>

### gccUiRunForm.handleSubmitFailCb(serverResponse)
handleSubmitFailCb

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Message is returned from serverside function  

| Param | Type | Description |
| --- | --- | --- |
| serverResponse | <code>string</code> | Server error message |

<a name="GccUiRunForm+handleSubmitSuccessCb"></a>

### gccUiRunForm.handleSubmitSuccessCb()
handleSubmitSuccessCb

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Message is returned from serverside function  
<a name="GccUiRunForm+injectTemplate"></a>

### gccUiRunForm.injectTemplate(data)
injectTemplate

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Pubsub data |

<a name="GccUiRunForm+populateForm"></a>

### gccUiRunForm.populateForm(data)
populateForm

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Apply spreadsheet values to the templated form elements  
**See**: [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Pubsub data |

<a name="GccUiRunForm+reset"></a>

### gccUiRunForm.reset()
reset

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
<a name="GccUiRunForm+showPlaceholderLogo"></a>

### gccUiRunForm.showPlaceholderLogo(show)
showPlaceholderLogo

**Kind**: instance method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Show the placeholder logo when the run form is not present.  

| Param | Type | Description |
| --- | --- | --- |
| show | <code>boolean</code> | Whether to show the placeholder |

<a name="GccUiRunForm.getInstance"></a>

### GccUiRunForm.getInstance(config) ⇒ [<code>GccUiRunForm</code>](#GccUiRunForm)
getInstance

**Kind**: static method of [<code>GccUiRunForm</code>](#GccUiRunForm)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUiRunForm</code>](#GccUiRunForm) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccUiSelectDisclosure"></a>

## GccUiSelectDisclosure
**Kind**: global class  
**Summary**: Expand and collapse a container, and expose the state of the select element contained within.  
**Access**: public  

* [GccUiSelectDisclosure](#GccUiSelectDisclosure)
    * [new GccUiSelectDisclosure(config)](#new_GccUiSelectDisclosure_new)
    * _instance_
        * [.closeOnSelect](#GccUiSelectDisclosure+closeOnSelect) : <code>boolean</code>
        * [.closeOnSelectDelay](#GccUiSelectDisclosure+closeOnSelectDelay) : <code>number</code>
        * [.instance](#GccUiSelectDisclosure+instance) : [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)
        * [.triggerClass](#GccUiSelectDisclosure+triggerClass) : <code>string</code>
        * [.init(formId)](#GccUiSelectDisclosure+init)
        * [.toggle(triggerEl)](#GccUiSelectDisclosure+toggle)
        * [.updateTriggerState(triggerEl)](#GccUiSelectDisclosure+updateTriggerState)
    * _static_
        * [.getInstance(config)](#GccUiSelectDisclosure.getInstance) ⇒ [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)

<a name="new_GccUiSelectDisclosure_new"></a>

### new GccUiSelectDisclosure(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiSelectDisclosure | <code>object</code> | Module configuration. |
| config.uiSelectDisclosure.closeOnSelect | <code>boolean</code> | Whether to automatically close the disclosure after a volume option is selected |
| config.uiSelectDisclosure.closeOnSelectDelay | <code>number</code> | Number of milliseconds to wait before automatically closing the disclosure |
| config.uiSelectDisclosure.triggerClass | <code>string</code> | Class selector of button that opens the disclosure |

<a name="GccUiSelectDisclosure+closeOnSelect"></a>

### gccUiSelectDisclosure.closeOnSelect : <code>boolean</code>
closeOnSelect

**Kind**: instance property of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
<a name="GccUiSelectDisclosure+closeOnSelectDelay"></a>

### gccUiSelectDisclosure.closeOnSelectDelay : <code>number</code>
closeOnSelectDelay

**Kind**: instance property of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
<a name="GccUiSelectDisclosure+instance"></a>

### gccUiSelectDisclosure.instance : [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)
instance

**Kind**: instance property of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
<a name="GccUiSelectDisclosure+triggerClass"></a>

### gccUiSelectDisclosure.triggerClass : <code>string</code>
triggerClass

**Kind**: instance property of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
<a name="GccUiSelectDisclosure+init"></a>

### gccUiSelectDisclosure.init(formId)
init

**Kind**: instance method of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
**See**: [https://www.w3.org/TR/wai-aria-practices/#disclosure](https://www.w3.org/TR/wai-aria-practices/#disclosure)  

| Param | Type | Description |
| --- | --- | --- |
| formId | <code>string</code> | Form ID |

<a name="GccUiSelectDisclosure+toggle"></a>

### gccUiSelectDisclosure.toggle(triggerEl)
toggle

**Kind**: instance method of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
**Summary**: Open or close the disclosure.  

| Param | Type | Description |
| --- | --- | --- |
| triggerEl | <code>HTMLElement</code> | The element (button) which triggered the toggle. |

<a name="GccUiSelectDisclosure+updateTriggerState"></a>

### gccUiSelectDisclosure.updateTriggerState(triggerEl)
updateTriggerState

**Kind**: instance method of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
**Summary**: When a volume option is selected, or a checklist item is checked, change the colour of the disclosure trigger checkbox.  

| Param | Type | Description |
| --- | --- | --- |
| triggerEl | <code>HTMLElement</code> | The element (button) which triggered the toggle. |

<a name="GccUiSelectDisclosure.getInstance"></a>

### GccUiSelectDisclosure.getInstance(config) ⇒ [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)
getInstance

**Kind**: static method of [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUiSelectDisclosure</code>](#GccUiSelectDisclosure) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GccUiSelectForm"></a>

## GccUiSelectForm
**Kind**: global class  
**Access**: public  

* [GccUiSelectForm](#GccUiSelectForm)
    * [new GccUiSelectForm(config)](#new_GccUiSelectForm_new)
    * _instance_
        * [.id](#GccUiSelectForm+id) : <code>string</code>
        * [.instance](#GccUiSelectForm+instance) : [<code>GccUiSelectForm</code>](#GccUiSelectForm)
        * [.handleChange(event)](#GccUiSelectForm+handleChange)
        * [.handleFormData(event)](#GccUiSelectForm+handleFormData)
        * [.handleSubmit(event)](#GccUiSelectForm+handleSubmit) ⇒ <code>\*</code>
        * [.handleSubmitFailCb(serverResponse)](#GccUiSelectForm+handleSubmitFailCb)
        * [.handleSubmitSuccessCb(serverResponseObj)](#GccUiSelectForm+handleSubmitSuccessCb)
        * [.init()](#GccUiSelectForm+init)
        * [.processSelections(serverResponseObj)](#GccUiSelectForm+processSelections)
        * [.toggleOptgroups(element)](#GccUiSelectForm+toggleOptgroups)
    * _static_
        * [.getInstance(config)](#GccUiSelectForm.getInstance) ⇒ [<code>GccUiSelectForm</code>](#GccUiSelectForm)

<a name="new_GccUiSelectForm_new"></a>

### new GccUiSelectForm(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | App configuration. |
| config.uiSelectForm | <code>object</code> | Module configuration. |
| config.uiSelectForm.id | <code>string</code> | ID selector of the form element. |

<a name="GccUiSelectForm+id"></a>

### gccUiSelectForm.id : <code>string</code>
id

**Kind**: instance property of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
<a name="GccUiSelectForm+instance"></a>

### gccUiSelectForm.instance : [<code>GccUiSelectForm</code>](#GccUiSelectForm)
instance

**Kind**: instance property of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
<a name="GccUiSelectForm+handleChange"></a>

### gccUiSelectForm.handleChange(event)
handleChange

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiSelectForm+handleFormData"></a>

### gccUiSelectForm.handleFormData(event)
handleFormData

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
**See**: [https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiSelectForm+handleSubmit"></a>

### gccUiSelectForm.handleSubmit(event) ⇒ <code>\*</code>
handleSubmit

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
**Returns**: <code>\*</code> - handleFormData  
**See**: [https://developers.google.com/apps-script/guides/html/communication#index.html_4](https://developers.google.com/apps-script/guides/html/communication#index.html_4)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GccUiSelectForm+handleSubmitFailCb"></a>

### gccUiSelectForm.handleSubmitFailCb(serverResponse)
handleSubmitFailCb

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
**Summary**: Message is returned from serverside function  

| Param | Type | Description |
| --- | --- | --- |
| serverResponse | <code>string</code> | Server error message |

<a name="GccUiSelectForm+handleSubmitSuccessCb"></a>

### gccUiSelectForm.handleSubmitSuccessCb(serverResponseObj)
handleSubmitSuccessCb

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
**Summary**: Callback after the form containing the run and date selects is submitted to the server.  

| Param | Type | Description |
| --- | --- | --- |
| serverResponseObj | <code>object</code> | Server response object |

<a name="GccUiSelectForm+init"></a>

### gccUiSelectForm.init()
init

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
<a name="GccUiSelectForm+processSelections"></a>

### gccUiSelectForm.processSelections(serverResponseObj)
processSelections

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  

| Param | Type | Description |
| --- | --- | --- |
| serverResponseObj | <code>object</code> | Server response object |

<a name="GccUiSelectForm+toggleOptgroups"></a>

### gccUiSelectForm.toggleOptgroups(element)
toggleOptgroups

**Kind**: instance method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
**Summary**: When an option is selected from an optgroup, limit other selects to choosing from the same optgroup.
 This is to prevent runs being chosen from different run sheets / days.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Select element |

<a name="GccUiSelectForm.getInstance"></a>

### GccUiSelectForm.getInstance(config) ⇒ [<code>GccUiSelectForm</code>](#GccUiSelectForm)
getInstance

**Kind**: static method of [<code>GccUiSelectForm</code>](#GccUiSelectForm)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GccUiSelectForm</code>](#GccUiSelectForm) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="gccIntegrationTests"></a>

## gccIntegrationTests(appConfig) ⇒ <code>\*</code>
gccIntegrationTests

**Kind**: global function  
**Returns**: <code>\*</code> - - HTML  

| Param | Type | Description |
| --- | --- | --- |
| appConfig | <code>object</code> | App config |

<a name="getResultsFromServer"></a>

## getResultsFromServer() ⇒ <code>\*</code>
**Kind**: global function  
**Summary**: Retrieve test results when ready.  
**Returns**: <code>\*</code> - - Test results  
<a name="doGet"></a>

## doGet() ⇒ <code>\*</code>
doGet

**Kind**: global function  
**Summary**: Function which runs when the web app is visited in a web browser. Do not edit.  
**Returns**: <code>\*</code> - - The GsheetCompostCollections library will load the web page.  
<a name="gccMiddleware"></a>

## gccMiddleware(classMethod, ...args) ⇒ <code>\*</code>
gccMiddleware

**Kind**: global function  
**Summary**: Middleware to call standalone scripts from container-bound environment.  
**Returns**: <code>\*</code> - callback    - Callable function with args  

| Param | Type | Description |
| --- | --- | --- |
| classMethod | <code>string</code> | Class.method (combined arguments to facilitate find and replace in codebase) |
| ...args | <code>\*</code> | Args for callable function |

<a name="gccSheetHandleEdit"></a>

## gccSheetHandleEdit(e) ⇒ <code>\*</code>
gccSheetHandleEdit

**Kind**: global function  
**Summary**: Run when the spreadsheet is edited.
 'Installable Trigger' (Triggers > Add Trigger)
  Differs from a 'Simple Trigger' (i.e. handleEdit in Main.gs) in that it can access services that require authorization.  
**Returns**: <code>\*</code> - callback  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | Trigger event object |

<a name="gccSheetHandleOpen"></a>

## gccSheetHandleOpen() ⇒ <code>\*</code>
gccSheetHandleOpen

**Kind**: global function  
**Summary**: Run when the spreadsheet is opened.
 'Installable Trigger' (Triggers > Add Trigger)
  Differs from a 'Simple Trigger' (i.e. handleEdit in Main.gs) in that it can access services that require authorization.  
**Returns**: <code>\*</code> - callback  
