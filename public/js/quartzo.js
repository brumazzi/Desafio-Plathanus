class Meta {
    constructor() {
        this._properts = {
            anchor: false,
            qselect: false,
            qcarousel: false,
        };
        this.metaTags = document.querySelectorAll("meta[name=setting]");
        for (let i = 0; i < this.metaTags.length; i += 1) {
            let metaTag = this.metaTags[i];
            let content = metaTag.getAttribute("content");
            if (Object.keys(this._properts).includes(content.toLowerCase())) {
                this.setProperty(content.toLowerCase());
            }
        }
        this.apply();
    }
    setProperty(name) {
        if (Object.keys(this._properts).includes(name.toLowerCase())) {
            this._properts[name.toLowerCase()] = true;
        }
    }
    removeProperty(name) {
        if (Object.keys(this._properts).includes(name.toLowerCase())) {
            this._properts[name.toLowerCase()] = false;
        }
    }
    apply(parent = document) {
        let elements = parent.querySelectorAll("select, .carousel, a");
        for (let i = 0; i < elements.length; i += 1) {
            this.applyTo(elements[i]);
        }
    }
    applyTo(element) {
        if (this._properts["qselect"] && element.tagName.toLowerCase() == "select") {
            new QSelect(element);
        }
        else if (this._properts["qcarousel"] && element.classList.contains("carousel")) {
            new QCarousel(element);
        }
    }
}
var meta;
window.addEventListener("load", (e) => {
    meta = new Meta();
});
class QCarousel {
    constructor(element) {
        this.timeout = 5;
        this.intervalReference = 0;
        this.target = element;
        QCarousel.items.push(element);
        this.itemList = element.querySelectorAll(".items > *");
        this.index = 0;
        if (element.querySelectorAll(".items > [show]").length > 0) {
            this.itemList[0].setAttribute("show", "");
        }
        this.resetTimeout();
        this.start();
        this.addButtonEvents();
    }
    next() {
        this.itemList[this.index].removeAttribute('show');
        this.index = (this.index + 1) % this.itemList.length;
        this.itemList[this.index].setAttribute('show', '');
        this.resetTimeout();
    }
    prev() {
        this.itemList[this.index].removeAttribute('show');
        this.index = (this.index - 1);
        if (this.index < 0)
            this.index = this.itemList.length - 1;
        this.itemList[this.index].setAttribute('show', '');
        this.resetTimeout();
    }
    resetTimeout() {
        this.currentTimeout = this.timeout;
    }
    start() {
        this.stop();
        this.resetTimeout();
        this.intervalReference = setInterval(() => {
            if (this.timeout == 0)
                return false;
            if (this.currentTimeout == 0)
                this.next();
            this.currentTimeout--;
        }, 1000);
    }
    stop() {
        if (this.intervalReference == 0)
            return false;
        clearInterval(this.intervalReference);
        this.intervalReference = 0;
    }
    upadte() {
        this.itemList = this.target.querySelectorAll(".items > *");
        this.resetTimeout();
    }
    addButtonEvents() {
        let buttonPreview = this.target.querySelector('[carousel-action="preview"]');
        let buttonNext = this.target.querySelector('[carousel-action="next"]');
        if (buttonPreview)
            buttonPreview.addEventListener("click", (evt) => { this.prev(); });
        if (buttonNext)
            buttonNext.addEventListener("click", (evt) => { this.next(); });
    }
}
QCarousel.items = new Array();
class QSelect {
    constructor(select) {
        this.target = document.createElement("details");
        this.valueItems = new Array();
        this.labelItems = new Array();
        if (select.tagName.toUpperCase() != "SELECT") {
            throw `"${select.tagName}" is a invalid object!`;
        }
        this.buildQselect(select);
        this.applyEvents();
        QSelect["SelectCount"] += 1;
        QSelect.items.push(this.target);
    }
    buildQselect(select) {
        let summaryTag = document.createElement("summary");
        let contentTag = document.createElement("div");
        this.target.appendChild(summaryTag);
        this.target.appendChild(contentTag);
        this.target.className = "dropdown dropdown-select";
        contentTag.className = "content";
        if (select.getAttribute("name") == "") {
            select.setAttribute("name", `qselect-${QSelect["SelectCount"]}`);
        }
        if (select.getAttribute("id") == "") {
            select.setAttribute("id", `qselect-${QSelect["SelectCount"]}`);
        }
        let repeats = select.childElementCount;
        for (let x = 0; x < repeats; x += 1) {
            let summaryInputTag = document.createElement("input");
            let contentInputTag = document.createElement("input");
            let contentLabelTag = document.createElement("label");
            summaryInputTag.setAttribute("id", `${select.getAttribute("id")}-${x}`);
            summaryInputTag.setAttribute("label", `${select.children[x].innerHTML}`);
            summaryInputTag.setAttribute("data-index", `${x}`);
            if (select.children[x].getAttribute("value")) {
                summaryInputTag.setAttribute("value", `${select.children[x].getAttribute("value")}`);
            }
            contentInputTag.setAttribute("name", `${select.getAttribute("name")}-label`);
            contentLabelTag.setAttribute("for", `${select.getAttribute("id")}-${x}`);
            contentLabelTag.innerHTML = select.children[x].innerHTML;
            if (select.children[x].hasAttribute("checked")) {
                summaryInputTag.setAttribute("checked", `true`);
                contentInputTag.setAttribute("checked", `true`);
            }
            if (select.hasAttribute("multiple")) {
                summaryInputTag.setAttribute("name", `${select.getAttribute("name")}[]`);
                summaryInputTag.setAttribute("type", `checkbox`);
                contentInputTag.setAttribute("type", `checkbox`);
            }
            else {
                summaryInputTag.setAttribute("name", `${select.getAttribute("name")}`);
                summaryInputTag.setAttribute("type", `radio`);
                contentInputTag.setAttribute("type", `radio`);
            }
            if (select.hasAttribute("required")) {
                summaryInputTag.setAttribute("required", "required");
            }
            this.valueItems.push(summaryInputTag);
            this.labelItems.push(contentInputTag);
            summaryTag.appendChild(summaryInputTag);
            contentTag.appendChild(contentInputTag);
            contentTag.appendChild(contentLabelTag);
        }
        select.replaceWith(this.target);
    }
    applyEvents() {
        let repeats = this.valueItems.length;
        for (let x = 0; x < repeats; x += 1) {
            let e = this.valueItems[x];
            e.addEventListener("change", () => {
                var _a;
                let index = parseInt(`${e.getAttribute("data-index")}`);
                this.labelItems[index].checked = !((_a = this.labelItems[index]) === null || _a === void 0 ? void 0 : _a.checked);
            });
        }
    }
}
QSelect.items = new Array();
QSelect["SelectCount"] = 0;
Element["fromJson"] = (json) => {
    if (typeof json == "string") {
        json = JSON.parse(json);
    }
    let buildTree = (object) => {
        let element;
        element = document.createElement(object["tag"]);
        let keys = Object.keys(object);
        for (let i = 0; i < keys.length; i += 1) {
            let key = keys[i].toLowerCase();
            if (key == "tag")
                continue;
            else if (key == "childrens") {
                for (let j = 0; j < object[keys[i]].length; j += 1) {
                    if (typeof object[keys[i]][j] == "string") {
                        element.append(object[keys[i]][j]);
                    }
                    else {
                        let child = buildTree(object[keys[i]][j]);
                        element.append(child);
                    }
                }
            }
            else {
                if (key.toLowerCase() == "classname")
                    key = "class";
                element.setAttribute(key, object[keys[i]]);
            }
        }
        return element;
    };
    if (json["element"] == undefined)
        return null;
    return buildTree(json["element"]);
};
Element.prototype["oldAppend"] = Element.prototype.append;
Element.prototype.append = function (node, eventJson = []) {
    this["oldAppend"](node);
    if (eventJson) {
        for (let i = 0; i < eventJson.length; i += 1) {
            let eventDescription = eventJson[i];
            if (!eventDescription["target"]) {
                eval(eventDescription["callback"])();
            }
            else if (eventDescription["target"][0] == "#") {
                let element = this.querySelector(eventDescription["target"]);
                element.addEventListener(eventDescription["event"], (ev) => { (eval(eventDescription["callback"]))(ev); });
            }
            else {
                let elements = this.querySelectorAll(eventDescription["target"]);
                for (let j = 0; j < elements.length; j += 1) {
                    elements[j].addEventListener(eventDescription["event"], (ev) => { (eval(eventDescription["callback"]))(ev); });
                }
            }
        }
    }
    meta.apply(this);
};
Element.prototype["appendFromJson"] = function (json) {
    if (typeof json == "string") {
        json = JSON.parse(json);
    }
    this.append(Element["fromJson"](json), json["events"]);
    return true;
};
// let elementJson = {
//   element: {
//     tagName: "button",
//     className: "button button-outline button-warning",
//     id: "json-button",
//     childrens: [
//       {
//         tagName: "span",
//         childrens: ["Text"]
//       }
//     ]
//   },
//   events:[
//     {
//       target: "#json-button",
//       event: "click",
//       callback: "(evt) => {alert('OK')}"
//     }
//   ]
// }
Element.prototype["textFrom"] = function (content) {
    let code = content.innerHTML;
    if (code.charAt(0) == '\n')
        code = code.slice(1);
    let spaces = 0;
    while (code.charAt(spaces) == ' ') {
        spaces += 1;
    }
    code = code['replaceAll']('<', '$lt');
    code = code['replaceAll']('>', '$gt');
    code = code['replaceAll']('="', '&__QUOTES__');
    code = code['replaceAll']("='", '&__QUOTES__');
    code = code['replaceAll']("'", '"');
    code = code['replaceAll']('"', '"</span>');
    code = code['replaceAll']('&__QUOTES__', '<span class="text-success">"');
    code = code['replaceAll']('$lt', '<span class="text-danger">&lt</span>');
    code = code['replaceAll']('$gt', '<span class="text-danger">&gt</span>');
    code = code['replaceAll']('let', '<span class="text-primary">let</span>"');
    code = code['replaceAll']('new', '<span class="text-warning">new</span>"');
    let lines = code.split('\n');
    for (let i = 0; i <= lines.length; i += 1) {
        if (lines[i])
            this.innerHTML += lines[i].slice(spaces) + "\n";
    }
};
window.addEventListener('load', (e) => {
    let pres = document.querySelectorAll('pre');
    for (let i = 0; i < pres.length; i += 1) {
        let pre = pres[i];
        if (pre.hasAttribute('text-from')) {
            let textFrom = pre.getAttribute('text-from');
            let content = document.getElementById(textFrom);
            pre["textFrom"](content);
        }
    }
});
const REQUEST_DATA_TYPE_TEXT = 'text';
const REQUEST_DATA_TYPE_JSON = 'json';
const REQUEST_DEFAULT_PARAMS = { method: "get" };
const REQUEST_DEFAULT_CALLBACK_JSON = (response) => {
    if (response["type"].toLowerCase() == "render") {
        if (response["target"]) {
            let elements = document.querySelectorAll(response["target"]);
            for (let i = 0; i < elements.length; i += 1) {
                switch (response["renderType"]) {
                    case "append":
                        elements[i]["appendFromJson"](response);
                        break;
                    case "replace-block":
                        let newElement = Element["fromJson"](response);
                        elements[i].replaceWith(newElement);
                        break;
                    default:
                        elements[i].innerHTML = "";
                        elements[i]["appendFromJson"](response);
                        break;
                }
            }
        }
        else {
            throw new Error(`Render not have target element.`);
        }
    }
    else if (response["type"].toLowerCase() == "script") {
        eval(response["javascript"]);
    }
    else {
        throw new Error(`Invalid type "${response["type"]}", use "render" or "script"!`);
    }
};
const REQUEST_DEFAULT_CALLBACK_HTML = (response) => {
    let htmlContent = (new DOMParser()).parseFromString(response, 'text/html').body.children[0];
    let type = htmlContent.getAttribute('type');
    let target = htmlContent.getAttribute('target');
    let renderType = htmlContent.getAttribute('renderType');
    let scripts = new Array();
    let elementList = new Array();
    for (let i = 0; i < htmlContent.children.length; i += 1) {
        let element = htmlContent.children[i];
        if (element.tagName.toLowerCase() == 'script')
            scripts.push(element);
        else
            elementList.push(element);
    }
    if (type.toLowerCase() == "render") {
        if (target) {
            let elements = document.querySelectorAll(target);
            for (let i = 0; i < elements.length; i += 1) {
                switch (renderType) {
                    case "append":
                        for (let j = 0; j < elementList.length; j += 1)
                            elements[i]["append"](elementList[j]);
                        break;
                    case "replace-block":
                        let paramStringList = [];
                        for (let j = 0; j < elementList.length; j += 1)
                            paramStringList.push(`elementList[${j}]`);
                        eval(`elements[i].replaceWith(${paramStringList.join(', ')})`);
                        break;
                    default:
                        elements[i].replaceChildren();
                        for (let j = 0; j < elementList.length; j += 1)
                            elements[i]["append"](elementList[j]);
                        break;
                }
            }
        }
        else {
            throw new Error(`Render not have target element.`);
        }
    }
    else {
        throw new Error(`Invalid type "${type}", use "render" or "script"!`);
    }
    for (let i = 0; i < scripts.length; i += 1) {
        let scriptTarget = scripts[i].getAttribute("target");
        let scriptEvent = scripts[i].getAttribute("event");
        let targetElements = document.querySelectorAll(scriptTarget);
        for (let j = 0; j < targetElements.length; j += 1) {
            targetElements[j].addEventListener(scriptEvent, (ev) => { (eval(scripts[i].innerText))(ev); });
        }
    }
};
const REQUEST_DEFAULT_ERROR = (error) => {
    console.error(error);
};
Request["requestPendings"] = 0;
Request["__pushStack__"] = () => {
    Request["requestPendings"]++;
    document.body.setAttribute("data-pendingRequest", `${(Request["requestPendings"] != 0)}`);
    let elements = document.querySelectorAll(".navbar-content");
    for (let i = 0; i < elements.length; i += 1) {
        elements[i].removeAttribute("open");
    }
};
Request["__popStack__"] = () => {
    Request["requestPendings"]--;
    document.body.setAttribute("data-pendingRequest", `${(Request["requestPendings"] != 0)}`);
};
Request["fetch"] = (url, params = REQUEST_DEFAULT_PARAMS, requestDataType = REQUEST_DATA_TYPE_TEXT, callback = null) => {
    if ((typeof params["body"]).toLowerCase() == "object")
        params["body"] = JSON.stringify(params["body"]);
    if (!callback) {
        if (requestDataType == REQUEST_DATA_TYPE_JSON)
            callback = REQUEST_DEFAULT_CALLBACK_JSON;
        else
            callback = REQUEST_DEFAULT_CALLBACK_HTML;
    }
    let request = new Request(url);
    fetch(request, params).then((_response) => {
        Request["__pushStack__"]();
        return _response[requestDataType]();
    }).then(callback).catch(REQUEST_DEFAULT_ERROR).finally(() => {
        Request["__popStack__"]();
    });
};
// let elementJson = {
//   type: "render",
//   target: ".elements",
//   renderType: "append",
//   element: {
//     tagName: "button",
//     className: "button button-outline button-warning",
//     id: "json-button",
//     childrens: [
//       {
//         tagName: "span",
//         childrens: "Text"
//       }
//     ]
//   },
//   events: [
//     {
//       target: "#json-button",
//       event: "click",
//       callback: "(evt) => {alert('OK')}"
//     }
//   ]
// }
// let functionJson = {
//   type: "script",
//   javascript: "alert('OK')"
// }
let setRemoteEvent2Anchors = function (elements) {
    for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].getAttribute("href") == "" || elements[i].getAttribute("href") == "#") {
            elements[i].setAttribute("href", "javascript:void(0)");
        }
        elements[i].addEventListener("click", (evt) => {
            if (elements[i].hasAttribute("remote")) {
                evt.preventDefault();
                let method;
                if (elements[i].hasAttribute("method"))
                    method = `${elements[i].getAttribute("method")}`.toLowerCase();
                else
                    method = "get";
                let extra = '?';
                if (elements[i].hasAttribute("target"))
                    extra += `meta[target]=${elements[i].getAttribute("target")}&`;
                if (elements[i].hasAttribute("template"))
                    extra += `meta[template]=${elements[i].getAttribute("template")}&`;
                extra = extra.slice(1);
                Request["fetch"](`${elements[i].getAttribute("href")}${extra}`, { method: method });
            }
        });
    }
};
let setRemoteEvent2Forms = function (elements) {
    for (let i = 0; i < elements.length; i += 1) {
        elements[i].addEventListener("submit", (evt) => {
            if (elements[i].hasAttribute("remote")) {
                evt.preventDefault();
                let method;
                if (elements[i].hasAttribute("method"))
                    method = `${elements[i].getAttribute("method")}`.toLowerCase();
                else
                    method = "get";
                let data = new URLSearchParams(new FormData(elements[i]));
                if (method.toLowerCase() == 'get' || method.toLowerCase() == 'head') {
                    let params = new Array();
                    for (const [key, value] of data.entries()) {
                        params.push(`${key}=${value}`);
                    }
                    if (elements[i].hasAttribute("target"))
                        params.push(`meta[target]=${elements[i].getAttribute("target")}`);
                    if (elements[i].hasAttribute("template"))
                        params.push(`meta[template]=${elements[i].getAttribute("template")}`);
                    Request["fetch"](elements[i].getAttribute("action") + `?${params.join('&')}`, { method: method });
                }
                else {
                    let meta = {};
                    if (elements[i].hasAttribute("target"))
                        meta["target"] = elements[i].getAttribute("target");
                    if (elements[i].hasAttribute("template"))
                        meta["template"] = elements[i].getAttribute("template");
                    data["meta"] = meta;
                    Request["fetch"](elements[i].getAttribute("action"), {
                        method: method,
                        headers: { "Content-Type": 'multipart/form-data' },
                        body: data
                    });
                }
            }
        });
    }
};
window.addEventListener('hashchange', function () {
    // called when change URL
});
window.addEventListener('load', (e) => {
    let anchors = document.querySelectorAll('a');
    setRemoteEvent2Anchors(anchors);
    let forms = document.querySelectorAll('form');
    setRemoteEvent2Forms(forms);
});