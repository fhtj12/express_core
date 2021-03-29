var util = require('../util/util');
var exception = require('../system/exception');
var server_config = require('../system/properties_manager').server_config;

const saltRounds = server_config['SALT_ROUND'];

/**
 * 문자열을 해시 암호화함.
 * @param {String} base_str @description 암호화할 문자열
 * @param {String} hash @description 해시 알고리즘 종류 (sha1, md5, sha256 등)
 * @param {String} digest @description Digest 종류 (base64, hex 등)
 * 
 * @author tirico
 */
var toHash = function(base_str, hash, digest) {
    util.checkArgs([base_str, hash, digest]);

    return crypto.createHash(hash).update(base_str).digest(digest);
}

/**
 * 문자열을 bcrypt 암호화함.
 * @param {String} base_str @description 암호화할 문자열
 * 
 * @author tirico
 */
var toBcrypt = function(base_str) {
    util.checkArgs([base_str]);
        
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) {
            throw exception('EDE0001'); // EDE0001=Encryption Parsing Error
        }
        bcrypt.hash(base_str, salt, function(err, hash) {
            if(err) {
                throw exception('EDE0002'); // EDE0002=Encrypt Error
            }
            return [hash, salt];
        });
    });
}

/**
 * 일반 문자열과 bcrypt 문자열을 비교하여 같은지 판단.
 * @param {String} plain_text @description 암호화 되어 있지 않은 일반 문자열
 * @param {String} crypt_text @description 암호화 되어 있는 문자열
 */
var bcryptCompare = function(plain_text, crypt_text) {
    util.checkArgs([plain_text, crypt_text]);

    bcrypt.compare(plain_text, crypt_text, function(err, res) {
        if(err) {
            throw exception('EDE0003'); // EDE0003=Encrypt Hash Parsing Error
        }
        return res;
    });
}

module.exports = {
    toHash : toHash
    , toBcrypt : toBcrypt
    , bcryptCompare : bcryptCompare
}