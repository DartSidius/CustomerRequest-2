/**
 * Created by Vladyslav Lyfar on 10.10.2018.
 */
({
    handleShareKanbanColumnsEvent: function(component, event, helper) {
        helper.getCurrentBoardColumns(component, event);
    },
    moveAllCardsToOtherColumn: function(component, event, helper) {
        helper.moveAllCardsToOtherColumn(component);
    },
    cancelForm: function(component, event, helper) {
        helper.hideForm(component);
    }
})