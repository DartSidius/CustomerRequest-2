/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public with sharing class KanbanCardRepository {

    public static KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        insert kanbanCard;
        return kanbanCard;
    }

    public static KanbanCard__c updateKanbanCard(KanbanCard__c kanbanCard) {
        update kanbanCard;
        return kanbanCard;
    }

    public static KanbanCard__c deleteKanbanCard(KanbanCard__c kanbanCard) {
        delete kanbanCard;
        return kanbanCard;
    }

    public static List<KanbanCard__c> getAllKanbanCardsByColumnId(Id columnId) {
        return [SELECT Id, Name, KanbanColumn__c, Description__c, DueDate__c
                FROM KanbanCard__c
                WHERE KanbanColumn__c = :columnId];
    }

    public static List<KanbanCard__c> getKanbanCardsByColumnsIds(List<KanbanColumn__c> columns) {
        return [SELECT Id
                FROM KanbanCard__c
                WHERE KanbanColumn__c IN :columns];
    }

}