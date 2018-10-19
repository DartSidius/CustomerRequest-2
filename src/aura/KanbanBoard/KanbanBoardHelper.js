/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    renameKanbanBoard: function(component, event) {
        component.set("v.simpleRecord", event.getParam("KanbanBoard"));
        this.saveKanbanBoardRecord(component);
    },

    saveKanbanBoardRecord: function(component) {
        let helper = this;
        component.find("record").saveRecord($A.getCallback((saveResult) => {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                helper.showSuccessToast("Your board has been renamed successfully!")
            }
        }));
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