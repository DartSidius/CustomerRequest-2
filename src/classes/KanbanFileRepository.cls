/**
 * Created by Vladyslav Lyfar on 01.11.2018.
 */

public class KanbanFileRepository {

    public static KanbanFile__c deleteKanbanFile(KanbanFile__c kanbanFile) {
        delete kanbanFile;
        return kanbanFile;
    }

    public static void deleteKanbanFileById(Id fileId) {
        delete [
                SELECT Id
                FROM KanbanFile__c
                WHERE Id = :fileId
        ];
    }

}