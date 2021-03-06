/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanColumnController {

    @AuraEnabled
    public static List<KanbanColumn__c> getAllKanbanBoardColumns(Id currentId) {
        return new KanbanColumnService().getAllKanbanBoardColumns(currentId);
    }


    @AuraEnabled
    public static KanbanColumn__c createNewKanbanColumn(KanbanColumn__c kanbanColumn) {
        return new KanbanColumnService().createNewKanbanColumn(kanbanColumn);
    }

    @AuraEnabled
    public static List<KanbanCard__c> getAllKanbanCards(Id currentId) {
        return new KanbanCardService().getAllKanbanCards(currentId);
    }

    @AuraEnabled
    public static KanbanColumn__c updateKanbanColumn(KanbanColumn__c kanbanColumn) {
        return new KanbanColumnService().updateKanbanColumn(kanbanColumn);
    }

    @AuraEnabled
    public static KanbanColumn__c deleteKanbanColumn(KanbanColumn__c kanbanColumn) {
        return new KanbanColumnService().deleteKanbanColumn(kanbanColumn);
    }

    @AuraEnabled
    public static KanbanColumn__c copyKanbanColumn(KanbanColumn__c kanbanColumn) {
        return new KanbanColumnService().copyKanbanColumn(kanbanColumn);
    }

    @AuraEnabled
    public static List<KanbanCard__c> deleteAllKanbanColumnCards(Id currentId) {
        return new KanbanColumnService().deleteAllKanbanColumnCards(currentId);
    }

    @AuraEnabled
    public static List<KanbanCard__c> moveAllKanbanCardsToOtherColumn(List<KanbanCard__c> kanbanCards) {
        return new KanbanColumnService().moveAllKanbanColumnCards(kanbanCards);
    }

}