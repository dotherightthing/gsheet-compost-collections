/**
 * @file GccUser.js
 */
class GccUser {
  /**
   * @class
   * @summary Properties and methods relating to users and roles.
   * @public
   */

  /* Static methods */

  /**
   * isValidUser
   *
   * @summary Checks if user is an editor of a file. First checks email, then check if member of group.
   * @param {string} email - email address of active user.
   * @param {string} fileID - the connected file ID with the shared editors.
   * @returns {boolean} true if user is an editor of file. Otherwise, false.
   * @memberof GccUser
   * @static
   * @see {@link https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/}
   * @see {@link https://www.youtube.com/watch?v=x_NPvk0pk8g}
   */
  static isValidUser(email, fileID) {
    let isValid = false; // Indicates if email is an editor.

    /**
     * Gets list of file editors by email.
     *
     * @returns {Array} list of emails of all editors in file
     */
    const emailList = (() => {
      let file;

      try {
        file = SpreadsheetApp.openById(fileID);
      } catch (error) {
        Logger.log(`${email} requested access`);
        return false; // user has no access
      }

      return file.getEditors().map((editor) => editor.getEmail());
    })();

    if (!emailList) {
      isValid = false;
      return isValid;
    }

    /**
     * Gets list any group email with edit permission that the user is a memeber of.
     *
     * @returns {boolean} true if match.
     */
    const groupEmailList = (() => {
      let isMemberOfGroup = false;

      GroupsApp.getGroups().map((group) => group.getEmail()).forEach((group) => {
        if (emailList.includes(group)) {
          isMemberOfGroup = true;
        }
      });

      return isMemberOfGroup;
    })();

    // Check if email in editor list.
    if (emailList.includes(email)) {
      isValid = true;
    } else if (groupEmailList) {
      isValid = true;
    }

    return isValid;
  }
}
