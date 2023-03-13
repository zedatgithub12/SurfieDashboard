const Connection = {
    url: "http://localhost:3000",
    api: "http://localhost:8000/api",
    remote: "https://pstest.puresight.com/cgi-bin/ProvisionAPI/",
    login: "/login",
    customers: "/customers",
   
    search: "/search/",
    addlicense: "/add/",
    removeLicense: "/remove/",
    deactivate: "/deactivate/",
    detach: "/detach/",
    pending: "/pending",
    activate: "/activate/",


    // support api's
    support: "/support",
    closeTicket: "/closeticket/",

    //mailing api's
    compose: "/compose"
};

export default Connection;