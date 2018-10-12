/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

public class KanbanTestFactory {

    public static List<KanbanBoard__c> generateBoards(Integer amount) {
        List<KanbanBoard__c> result = new List<KanbanBoard__c>();
        for(Integer i = 0; i < amount; i++) {
            result.add(new KanbanBoard__c(
                    Name = 'Test' + i
            ));
        }
        insert result;
        return result;
    }

    public static List<KanbanColumn__c> generateColumns(Integer amount, List<KanbanBoard__c> boards) {
        List<KanbanColumn__c> result = new List<KanbanColumn__c>();
        for(KanbanBoard__c kanbanBoard : boards) {
            for(Integer i = 0; i < amount; i++) {
                result.add(new KanbanColumn__c(
                        Name = 'Test' + i,
                        KanbanBoard__c = kanbanBoard.Id
                ));
            }
        }
        insert result;
        return result;
    }

    public static List<KanbanCard__c> generateCards(Integer amount, List<KanbanColumn__c> columns) {
        List<KanbanCard__c> result = new List<KanbanCard__c>();
        for(KanbanColumn__c kabanColumn : columns) {
            for(Integer i = 0; i < amount; i++) {
                result.add(new KanbanCard__c(
                        Name = 'Test' + i,
                        KanbanColumn__c = kabanColumn.Id
                ));
            }
        }
        insert result;
        return result;
    }

}