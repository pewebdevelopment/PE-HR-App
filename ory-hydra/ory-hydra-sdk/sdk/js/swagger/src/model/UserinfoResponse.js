/**
 * ORY Hydra - Cloud Native OAuth 2.0 and OpenID Connect Server
 * Welcome to the ORY Hydra HTTP API documentation. You will find documentation for all HTTP APIs here. Keep in mind that this document reflects the latest branch, always. Support for versioned documentation is coming in the future.
 *
 * OpenAPI spec version: Latest
 * Contact: hi@ory.am
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3
 *
 * Do not edit the class manually.
 *
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'))
  } else {
    // Browser globals (root is window)
    if (!root.OryHydraCloudNativeOAuth20AndOpenIdConnectServer) {
      root.OryHydraCloudNativeOAuth20AndOpenIdConnectServer = {}
    }
    root.OryHydraCloudNativeOAuth20AndOpenIdConnectServer.UserinfoResponse = factory(
      root.OryHydraCloudNativeOAuth20AndOpenIdConnectServer.ApiClient
    )
  }
})(this, function(ApiClient) {
  'use strict'

  /**
   * The UserinfoResponse model module.
   * @module model/UserinfoResponse
   * @version Latest
   */

  /**
   * Constructs a new <code>UserinfoResponse</code>.
   * The userinfo response
   * @alias module:model/UserinfoResponse
   * @class
   */
  var exports = function() {
    var _this = this
  }

  /**
   * Constructs a <code>UserinfoResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserinfoResponse} obj Optional instance to populate.
   * @return {module:model/UserinfoResponse} The populated <code>UserinfoResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports()

      if (data.hasOwnProperty('birthdate')) {
        obj['birthdate'] = ApiClient.convertToType(data['birthdate'], 'String')
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String')
      }
      if (data.hasOwnProperty('email_verified')) {
        obj['email_verified'] = ApiClient.convertToType(
          data['email_verified'],
          'Boolean'
        )
      }
      if (data.hasOwnProperty('family_name')) {
        obj['family_name'] = ApiClient.convertToType(
          data['family_name'],
          'String'
        )
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = ApiClient.convertToType(data['gender'], 'String')
      }
      if (data.hasOwnProperty('given_name')) {
        obj['given_name'] = ApiClient.convertToType(
          data['given_name'],
          'String'
        )
      }
      if (data.hasOwnProperty('locale')) {
        obj['locale'] = ApiClient.convertToType(data['locale'], 'String')
      }
      if (data.hasOwnProperty('middle_name')) {
        obj['middle_name'] = ApiClient.convertToType(
          data['middle_name'],
          'String'
        )
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String')
      }
      if (data.hasOwnProperty('nickname')) {
        obj['nickname'] = ApiClient.convertToType(data['nickname'], 'String')
      }
      if (data.hasOwnProperty('phone_number')) {
        obj['phone_number'] = ApiClient.convertToType(
          data['phone_number'],
          'String'
        )
      }
      if (data.hasOwnProperty('phone_number_verified')) {
        obj['phone_number_verified'] = ApiClient.convertToType(
          data['phone_number_verified'],
          'Boolean'
        )
      }
      if (data.hasOwnProperty('picture')) {
        obj['picture'] = ApiClient.convertToType(data['picture'], 'String')
      }
      if (data.hasOwnProperty('preferred_username')) {
        obj['preferred_username'] = ApiClient.convertToType(
          data['preferred_username'],
          'String'
        )
      }
      if (data.hasOwnProperty('profile')) {
        obj['profile'] = ApiClient.convertToType(data['profile'], 'String')
      }
      if (data.hasOwnProperty('sub')) {
        obj['sub'] = ApiClient.convertToType(data['sub'], 'String')
      }
      if (data.hasOwnProperty('updated_at')) {
        obj['updated_at'] = ApiClient.convertToType(
          data['updated_at'],
          'Number'
        )
      }
      if (data.hasOwnProperty('website')) {
        obj['website'] = ApiClient.convertToType(data['website'], 'String')
      }
      if (data.hasOwnProperty('zoneinfo')) {
        obj['zoneinfo'] = ApiClient.convertToType(data['zoneinfo'], 'String')
      }
    }
    return obj
  }

  /**
   * End-User's birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format. The year MAY be 0000, indicating that it is omitted. To represent only the year, YYYY format is allowed. Note that depending on the underlying platform's date related function, providing just year can result in varying month and day, so the implementers need to take this factor into account to correctly process the dates.
   * @member {String} birthdate
   */
  exports.prototype['birthdate'] = undefined
  /**
   * End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 [RFC5322] addr-spec syntax. The RP MUST NOT rely upon this value being unique, as discussed in Section 5.7.
   * @member {String} email
   */
  exports.prototype['email'] = undefined
  /**
   * True if the End-User's e-mail address has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this e-mail address was controlled by the End-User at the time the verification was performed. The means by which an e-mail address is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating.
   * @member {Boolean} email_verified
   */
  exports.prototype['email_verified'] = undefined
  /**
   * Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.
   * @member {String} family_name
   */
  exports.prototype['family_name'] = undefined
  /**
   * End-User's gender. Values defined by this specification are female and male. Other values MAY be used when neither of the defined values are applicable.
   * @member {String} gender
   */
  exports.prototype['gender'] = undefined
  /**
   * Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.
   * @member {String} given_name
   */
  exports.prototype['given_name'] = undefined
  /**
   * End-User's locale, represented as a BCP47 [RFC5646] language tag. This is typically an ISO 639-1 Alpha-2 [ISO639‑1] language code in lowercase and an ISO 3166-1 Alpha-2 [ISO3166‑1] country code in uppercase, separated by a dash. For example, en-US or fr-CA. As a compatibility note, some implementations have used an underscore as the separator rather than a dash, for example, en_US; Relying Parties MAY choose to accept this locale syntax as well.
   * @member {String} locale
   */
  exports.prototype['locale'] = undefined
  /**
   * Middle name(s) of the End-User. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names are not used.
   * @member {String} middle_name
   */
  exports.prototype['middle_name'] = undefined
  /**
   * End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.
   * @member {String} name
   */
  exports.prototype['name'] = undefined
  /**
   * Casual name of the End-User that may or may not be the same as the given_name. For instance, a nickname value of Mike might be returned alongside a given_name value of Michael.
   * @member {String} nickname
   */
  exports.prototype['nickname'] = undefined
  /**
   * End-User's preferred telephone number. E.164 [E.164] is RECOMMENDED as the format of this Claim, for example, +1 (425) 555-1212 or +56 (2) 687 2400. If the phone number contains an extension, it is RECOMMENDED that the extension be represented using the RFC 3966 [RFC3966] extension syntax, for example, +1 (604) 555-1234;ext=5678.
   * @member {String} phone_number
   */
  exports.prototype['phone_number'] = undefined
  /**
   * True if the End-User's phone number has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this phone number was controlled by the End-User at the time the verification was performed. The means by which a phone number is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating. When true, the phone_number Claim MUST be in E.164 format and any extensions MUST be represented in RFC 3966 format.
   * @member {Boolean} phone_number_verified
   */
  exports.prototype['phone_number_verified'] = undefined
  /**
   * URL of the End-User's profile picture. This URL MUST refer to an image file (for example, a PNG, JPEG, or GIF image file), rather than to a Web page containing an image. Note that this URL SHOULD specifically reference a profile photo of the End-User suitable for displaying when describing the End-User, rather than an arbitrary photo taken by the End-User.
   * @member {String} picture
   */
  exports.prototype['picture'] = undefined
  /**
   * Non-unique shorthand name by which the End-User wishes to be referred to at the RP, such as janedoe or j.doe. This value MAY be any valid JSON string including special characters such as @, /, or whitespace.
   * @member {String} preferred_username
   */
  exports.prototype['preferred_username'] = undefined
  /**
   * URL of the End-User's profile page. The contents of this Web page SHOULD be about the End-User.
   * @member {String} profile
   */
  exports.prototype['profile'] = undefined
  /**
   * Subject - Identifier for the End-User at the IssuerURL.
   * @member {String} sub
   */
  exports.prototype['sub'] = undefined
  /**
   * Time the End-User's information was last updated. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
   * @member {Number} updated_at
   */
  exports.prototype['updated_at'] = undefined
  /**
   * URL of the End-User's Web page or blog. This Web page SHOULD contain information published by the End-User or an organization that the End-User is affiliated with.
   * @member {String} website
   */
  exports.prototype['website'] = undefined
  /**
   * String from zoneinfo [zoneinfo] time zone database representing the End-User's time zone. For example, Europe/Paris or America/Los_Angeles.
   * @member {String} zoneinfo
   */
  exports.prototype['zoneinfo'] = undefined

  return exports
})
