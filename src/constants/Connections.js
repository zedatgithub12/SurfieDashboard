const Connection = {
    url: "http://localhost:3000",
    api: "http://localhost:8000/api",
    host: "https://surfie-t.puresight.com",
    // api: "https://admin.surfieethiopia.com/backend/api",
    remote: "https://surfie-t.puresight.com/cgi-bin/ProvisionAPI/",
    login: "/login",
    customers: "/customers",
   
    search: "/search/",
    addlicense: "/add/",
    removeLicense: "/remove/",
    deactivate: "/deactivate/",
    detach: "/detach/",
    pending: "/pending",
    activate: "/activate/",
    reactivate: "/reactivate/",
    xmlrequest: "/xmlrequest",

    // support api's
    support: "/support",
    closeTicket: "/closeticket/",

    //mailing api's
    compose: "/compose"
};

export default Connection;