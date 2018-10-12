/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */

@isTest
public class KanbanBoardsChangeTest {

    @isTest
    static void TestColumnDeleteRelatedCards() {
        //generate data

        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(5);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(5, boards);
        List<KanbanCard__c> cards = KanbanTestFactory.generateCards(5, columns);

        //make magic
        Test.startTest();

        delete [SELECT Id FROM KanbanColumn__c];

        Test.stopTest();

        //compare results
        System.assertEquals(0, [SELECT count() FROM KanbanCard__c]);
    }

    @isTest
    static void TestBoardDeleteRelatedCardsAndColumns() {
        //generate data

        List<KanbanBoard__c> boards = KanbanTestFactory.generateBoards(5);
        List<KanbanColumn__c> columns = KanbanTestFactory.generateColumns(5, boards);
        List<KanbanCard__c> cards = KanbanTestFactory.generateCards(5, columns);

        //make magic
        Test.startTest();

        delete [SELECT Id FROM KanbanBoard__c];

        Test.stopTest();

        //compare results
        System.assertEquals(0, [SELECT count() FROM KanbanColumn__c]);
        System.assertEquals(0, [SELECT count() FROM KanbanCard__c]);
    }

}