import "reflect-metadata";
import { TimelineComponent } from './timeline';

/**
 * Block level variable for assigning the Mock DatesProvider service to
 *
 */
let component = null;

/**
 * Re-create the MockDatesProvider class object before each
 * unit test is run
 *
 */
beforeEach(() => {
  component = new TimelineComponent();
});

/**
 * Group the unit tests for the MockDatesProvider into one
 * test suite
 *
 */
describe("Timeline component", () => {

  /**
   * Test that the returned value matches true
   */
  test("Check to see if toggle works", () => {
    expect.assertions(1); // Number of tests that need to pass
    let test = false;
    let item = {
        itemExpand: true
    }
    expect(test).toEqual(component.toggleItem(item)); // Since item is being toggled from true to false, value should equal false
  });

  /**
   * Test that the returned value matches false
   */
  test("Check to see if toggle works", () => {
    expect.assertions(1); // Number of tests that need to pass
    let test = true;
    let item = {
        itemExpand: false
    }
    expect(test).toEqual(component.toggleItem(item)); // Since item is being toggled from false to true, value should equal true
  });


});
