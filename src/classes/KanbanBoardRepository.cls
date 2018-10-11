/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanBoardRepository {

    public static KanbanBoard__c getKanbanBoardById(Id id) {
        return [SELECT Id, Name
                FROM KanbanBoard__c
                WHERE Id = :id];
    }

    public static List<KanbanBoard__c> getAllKanbanBoards() {
        return [SELECT Id, Name
                FROM KanbanBoard__c];
    }

}