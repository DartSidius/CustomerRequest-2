/**
 * Created by Vladyslav Lyfar on 30.10.2018.
 */
({
    handleRedirectData: function(component, event) {
        let redirectLink = window.location.href || location.href;
        if(redirectLink.includes("?code=")) {
            let authorizationCode = redirectLink.split("?code=")[1];
            let action = component.get("c.getDropboxAccessTokenString");
            let self = this;
            action.setParams({
                "authorizationCode": authorizationCode
            });
            action.setCallback(this, (response) => {
                let state = response.getState();
                if(state === "SUCCESS") {
                    let result = response.getReturnValue();
                    if(result !== null) {
                        console.log(result);
                        component.set("v.message", "You`ve been reauthorized successfully! Redirecting back to your org...");
                        setTimeout(() => {
                            location.assign("https://cunning-goat-l5flx3-dev-ed.lightning.force.com/lightning/o/KanbanBoard__c/list?filterName=Recent");
                        }, 3000);
                    }
                }
            });

            $A.enqueueAction(action);
        }
    },

    showSuccessToast: function(message) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "type": "success",
            "message": message
        });
        toastEvent.fire();
    }
})