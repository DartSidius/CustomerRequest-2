/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanBoardController {

    @AuraEnabled
    public static List<KanbanColumn__c> getAllKanbanBoardColumns(Id currentId) {
        return new KanbanColumnService().getAllKanbanBoardColumns(currentId);
    }

    @AuraEnabled
    public static KanbanBoard__c getCurrentKanbanBoard(Id currentId) {
        return new KanbanBoardService().getCurrentKanbanBoard(currentId);
    }

    @AuraEnabled
    public static List<KanbanBoard__c> getAllKanbanBoards() {
        return new KanbanBoardService().getAllKanbanBoards();
    }
}