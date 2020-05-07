/**
 * Wraps around a certain value.
 * Resembles the Java Optional, except a Wrapper has no method for checking whether a value exists.
 * Created for an ad hoc purpose for reset password modal because
 * the Promise returned is mixed with Promise returned by closing the modal.
 */
export class Wrapper<T> {
  /**
   * The value stored by this wrapper
   */
  value: T;

  /**
   * Constructor
   *
   * @param value The value to be stored in this wrapper
   */
  constructor(value?: T) {
    this.value = value;
  }
}
