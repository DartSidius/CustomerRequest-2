/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanColumnRepository {

    public static List<KanbanColumn__c> getAllKanbanColumnsByBoardId(Id id) {
        return [SELECT Id, Name
                FROM KanbanColumn__c
                WHERE KanbanBoard__c = :id];
    }

    public static KanbanColumn__c createNewKanbanColumn(KanbanColumn__c kanbanColumn) {
        insert kanbanColumn;
        return kanbanColumn;
    }

    public static KanbanColumn__c updateKanbanColumn(KanbanColumn__c kanbanColumn) {
        update kanbanColumn;
        return kanbanColumn;
    }

    public static KanbanColumn__c deleteKanbanColumn(KanbanColumn__c kanbanColumn) {
        delete kanbanColumn;
        return kanbanColumn;
    }

    public static List<KanbanColumn__c> getKanbanColumnsByBoardRecordsIds(List<KanbanBoard__c> boards) {
        return [SELECT Id
                FROM KanbanColumn__c
                WHERE KanbanBoard__c IN :boards];
    }

}