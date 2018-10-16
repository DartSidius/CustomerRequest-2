/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    doInit: function(component, event, helper) {
        helper.doInit(component);
    },
    handleRenameKanbanBoardEvent: function(component, event, helper) {
        helper.renameKanbanBoard(component, event);
    }
})