/**
 * Created by Vladyslav Lyfar on 01.11.2018.
 */

public class KanbanFileTriggerHandler {

    public static void onBeforeDelete(List<KanbanFile__c> kanbanFiles) {
        KanbanFileService.deleteKanbanFile(kanbanFiles.get(0).Id, kanbanFiles.get(0).Name);
    }

}