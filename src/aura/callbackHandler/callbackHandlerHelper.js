/**
 * Created by Vladyslav Lyfar on 30.10.2018.
 */
({
    handleRedirectData: function(component, event) {
        let redirectLink = window.location.href || location.href;
        if(redirectLink.includes("?code=")) {
            let authorizationCode = redirectLink.split("?code=")[1];
            let action = component.get("c.getDropboxAccessTokenString");
            action.setParams({
                "authorizationCode": authorizationCode
            });
            action.setCallback(this, (response) => {
                let state = response.getState();
                if(state === "SUCCESS") {
                    let result = response.getReturnValue();
                    if(result !== null) {
                        console.log(result);
                        location.assign("https://cunning-goat-l5flx3-dev-ed.lightning.force.com/lightning/o/KanbanBoard__c/list?filterName=Recent");
                    }
                }
            });

            $A.enqueueAction(action);
        }
    }
})