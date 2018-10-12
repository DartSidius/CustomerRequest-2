/**
 * Created by Vladyslav Lyfar on 12.10.2018.
 */
@isTest
public class KanbanCardControllerTest {
    @isTest
    static void TestCreateNewKanbanCard() {
        //prepare data

        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(2);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(2, boards);
        KanbanCard__c newKanbanCard = new KanbanCard__c(
                Name = 'Test',
                KanbanColumn__c = columns.get(0).Id
        );

        //make magic
        Test.startTest();
        KanbanCardController.createNewKanbanCard(newKanbanCard);
        Test.stopTest();

        //compare results

        System.assertEquals(1, [SELECT Count() FROM KanbanCard__c WHERE KanbanColumn__c = :columns.get(0).Id]);

    }
    @isTest
    static void TestUpdateKanbanCard() {
        //prepare data

        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(1);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(2, boards);
        List<KanbanCard__c> cards = KanbanTestFactory.generateCards(5, columns);

        cards.get(0).KanbanColumn__c = columns.get(1).Id;

        //make magic
        Test.startTest();
        KanbanCardController.updateKanbanCard(cards.get(0));
        Test.stopTest();

        //compare results

        System.assertEquals(6, [SELECT Count() FROM KanbanCard__c WHERE KanbanColumn__c = :columns.get(1).Id ]);
    }
    @isTest
    static void TestCopyKanbanCard() {
        //prepare data
        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(1);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(2, boards);
        List<KanbanCard__c> cards = KanbanTestFactory.generateCards(5, columns);

        //make magic
        Test.startTest();
        KanbanCardController.copyKanbanCard(cards.get(0));
        Test.stopTest();

        //compare results

        System.assertEquals(2, [SELECT Count() FROM KanbanCard__c WHERE KanbanColumn__c = :columns.get(0).Id AND Name LIKE :cards.get(0).Name]);
    }
}