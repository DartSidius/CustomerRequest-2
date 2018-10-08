/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanColumnController {

    @AuraEnabled
    public static KanbanColumn__c createNewKanbanColumn(KanbanColumn__c kanbanColumn) {
        insert kanbanColumn;
        return kanbanColumn;
    }

    @AuraEnabled
    public static List<KanbanCard__c> getAllKanbanCards(Id currentId) {
        return [SELECT Id, Name, KanbanColumn__c
                FROM KanbanCard__c
                WHERE KanbanColumn__c = :currentId];
    }
}