function smtpapi(header) {
    header = header || {};
    this.header = {};
    this.header.to = header.to || [];
    this.header.sub = header.sub || {};
    this.header.unique_args = header.unique_args || {};
    this.header.category = header.category || [];
    this.header.section = header.section || {};
    this.header.filters = header.filters || {};
}

function Email(mail) {
    if (!(this instanceof Email)) return new Email(mail);
    mail = mail || {};
    smtpapi.call(this, mail["x-smtpapi"]);
    this.body = {};
    this.toCounter = 0;
    this.bccCounter = 0;
    this.tonameCounter = 0;
    this.addTo(mail.to || mail["to[]"]);
    this.addToName(mail.toname || mail["toname[]"]);
    this.addBcc(mail.bcc || mail["bcc[]"]);
    this.body.from = mail.from || "";
    this.body.fromname = mail.fromname || "";
    this.body.subject = mail.subject || "";
    this.body.text = mail.text || "";
    this.body.html = mail.html || "";
    this.body.replyto = mail.replyto || "";
    this.body.dates = mail.date || new Date().toUTCString();
    this.body.headers = mail.headers || "";
    if (mail.files && mail.files instanceof Array) for (var i = 0, len = mail.files.length; len > i; i++) this.addFile(mail.files[i].file, mail.files[i].name);
}

function SendGrid(api_user, api_key) {
    if (!(this instanceof SendGrid)) return new SendGrid(api_user, api_key);
    var _buildBody = function(mail) {
        mail = "Email" === mail.constructor.name ? mail.getEmail() : new Email(mail).getEmail();
        mail.api_user = credentials.api_user;
        mail.api_key = credentials.api_key;
        return mail;
    };
    var options = {
        method: "POST",
        uri: "https://api.sendgrid.com/api/mail.send.json"
    };
    var credentials = {
        api_user: api_user,
        api_key: api_key
    };
    this.send = function(email, cb) {
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                cb(null);
            },
            onerror: function() {
                cb(JSON.parse(this.responseText));
            },
            timeout: 5e3
        });
        email = _buildBody(email);
        client.open(options.method, options.uri);
        client.send(email);
    };
    this.Email = Email;
    this.smtpapi = smtpapi;
}

smtpapi.prototype.addTo = function(to) {
    to instanceof Array ? this.header.to = this.header.to.concat(to) : this.header.to.push(to);
};

smtpapi.prototype.setTos = function(to) {
    this.header.to = to instanceof Array ? to : [ to ];
};

smtpapi.prototype.addSubstitution = function(key, val) {
    void 0 === this.header.sub[key] && (this.header.sub[key] = []);
    val instanceof Array ? this.header.sub = this.header.sub[key].concat(val) : this.header.sub[key].push(val);
};

smtpapi.prototype.setSubstitutions = function(subs) {
    this.header.sub = subs;
};

smtpapi.prototype.addUniqueArg = function(key, val) {
    this.header.unique_args[key] = val;
};

smtpapi.prototype.setUniqueArgs = function(val) {
    this.header.unique_args = val;
};

smtpapi.prototype.addCategory = function(cat) {
    cat instanceof Array ? this.header.category.concat(cat) : this.header.category.push(cat);
};

smtpapi.prototype.setCategories = function(cats) {
    this.header.category = cats instanceof Array ? cats : [ cats ];
};

smtpapi.prototype.addSection = function(sec, val) {
    this.header.section[sec] = val;
};

smtpapi.prototype.setSections = function(sec) {
    this.header.section = sec;
};

smtpapi.prototype.addFilter = function(filter, setting, val) {
    void 0 === this.header.filters[filter] && (this.header.filters[filter] = {
        settings: {}
    });
    this.header.filters[filter].settings[setting] = val;
};

smtpapi.prototype.setFilters = function(filters) {
    this.header.filters = filters;
};

smtpapi.prototype.jsonString = function() {
    var header = {};
    for (var key in this.header) this.header.hasOwnProperty(key) && Object.keys(this.header[key]).length && (header[key] = this.header[key]);
    return JSON.stringify(header);
};

Email.prototype = Object.create(smtpapi.prototype);

Email.prototype.constructor = Email;

Email.prototype.addTo = function(email) {
    if (email instanceof Array) for (var i = 0, len = email.length; len > i; i++) this.body["to[" + this.toCounter++ + "]"] = email[i]; else this.body["to[" + this.toCounter++ + "]"] = email;
};

Email.prototype.addToName = function(name) {
    if (name instanceof Array) for (var i = 0, len = name.length; len > i; i++) this.body["toname[" + this.tonameCounter++ + "]"] = name[i]; else this.body["toname[" + this.tonameCounter++ + "]"] = name;
};

Email.prototype.setFrom = function(email) {
    this.body.from = email;
};

Email.prototype.setFromName = function(name) {
    this.body.fromname = name;
};

Email.prototype.setSubject = function(subject) {
    this.body.subject = subject;
};

Email.prototype.setText = function(text) {
    this.body.text = text;
};

Email.prototype.setHTML = function(html) {
    this.body.html = html;
};

Email.prototype.addBcc = function(bcc) {
    if (bcc instanceof Array) for (var i = 0, len = bcc.length; len > i; i++) this.body["bcc[" + this.bccCounter++ + "]"] = bcc[i]; else this.body["bcc[" + this.bccCounter++ + "]"] = bcc;
};

Email.prototype.setReplyTo = function(replyto) {
    this.body.replyto = replyto;
};

Email.prototype.setDate = function(date) {
    this.body.date = date;
};

Email.prototype.addFile = function(file, name) {
    "string" == typeof file && (file = Titanium.Filesystem.getFile(file));
    name = name || file.name;
    this.body["files[" + name + "]"] = file;
};

Email.prototype.setHeaders = function(header) {
    this.body.header = header;
};

Email.prototype.setAPIHeader = function(header) {
    this.body["x-smtpapi"] = header || this.jsonString();
};

Email.prototype.getEmail = function() {
    this.setAPIHeader();
    var body = {};
    for (var key in this.body) if (this.body.hasOwnProperty(key) && this.body[key]) {
        if (this.body[key] instanceof Array && 0 === this.body[key].length) continue;
        body[key] = this.body[key];
    }
    return body;
};

module.exports = SendGrid;