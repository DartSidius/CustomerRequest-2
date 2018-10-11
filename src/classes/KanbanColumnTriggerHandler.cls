/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanColumnTriggerHandler {

    KanbanColumnService kanbanColumnService;

    public KanbanColumnTriggerHandler() {
        this.kanbanColumnService = new KanbanColumnService();
    }

    public void onBeforeDelete(List<KanbanColumn__c> oldKanbanColumnList) {
        this.kanbanColumnService.deleteAllRelatedChildCards(oldKanbanColumnList);
    }

}