/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public with sharing class KanbanCardRepository {

    public static KanbanCard__c createNewKanbanCard(KanbanCard__c kanbanCard) {
        insert kanbanCard;
        return kanbanCard;
    }

    public static List<KanbanCard__c> createNewKanbanCards(List<KanbanCard__c> kanbanCards) {
        insert kanbanCards;
        return kanbanCards;
    }

    public static KanbanCard__c updateKanbanCard(KanbanCard__c kanbanCard) {
        update kanbanCard;
        return kanbanCard;
    }

    public static KanbanCard__c deleteKanbanCard(KanbanCard__c kanbanCard) {
        delete kanbanCard;
        return kanbanCard;
    }

    public static List<KanbanCard__c> deleteAllKanbanCards(List<KanbanCard__c> kanbanCards) {
        delete kanbanCards;
        return kanbanCards;
    }

    public static List<KanbanCard__c> updateKanbanCards(List<KanbanCard__c> kanbanCards) {
        update kanbanCards;
        return kanbanCards;
    }

    public static List<KanbanCard__c> getAllKanbanCardsByColumnId(Id columnId) {
        return [SELECT Id, Name, KanbanColumn__c, Description__c, DueDate__c
                FROM KanbanCard__c
                WHERE KanbanColumn__c = :columnId
                ORDER BY CreatedDate ASC];
    }

    public static List<KanbanCard__c> getKanbanCardsByColumnsIds(List<KanbanColumn__c> columns) {
        return [SELECT Id
                FROM KanbanCard__c
                WHERE KanbanColumn__c IN :columns];
    }

}