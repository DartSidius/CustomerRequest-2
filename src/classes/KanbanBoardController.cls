/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */

public with sharing class KanbanBoardController {

    @AuraEnabled
    public static List<KanbanColumn__c> getCurrentKanbanBoardColumns(Id currentId) {
        return [SELECT Id, Name
                FROM KanbanColumn__c
                WHERE KanbanBoard__c = :currentId];
    }

    @AuraEnabled
    public static KanbanBoard__c getCurrentKanbanBoard(Id currentId) {
        return [SELECT Id, Name
                FROM KanbanBoard__c
                WHERE Id = :currentId];
    }

}