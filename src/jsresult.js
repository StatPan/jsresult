/**
 * @class
 * @template T, E
 * @description 성공 또는 실패를 나타내는 `Result` 클래스.
 */
export class Result {
    constructor(isOk, value, error) {
      this.ok = isOk;
      if (isOk) {
        this.value = value;
      } else {
        this.error = error;
      }
    }
  
    static Ok(value) {
      return new Result(true, value, undefined);
    }
  
    static Err(error) {
      return new Result(false, undefined, error);
    }
  
    isOk() {
      return this.ok;
    }
  
    isErr() {
      return !this.ok;
    }
  
    unwrap() {
      if (this.ok) {
        return this.value;
      }
      throw this.error;
    }
  
    unwrapOr(defaultValue) {
      return this.ok ? this.value : defaultValue;
    }
  
    map(fn) {
      return this.ok ? Result.Ok(fn(this.value)) : this;
    }
  
    andThen(fn) {
      return this.ok ? fn(this.value) : this;
    }
  }
  
  /**
   * @class
   * @template T
   * @description 선택적 값을 나타내는 `Option` 클래스.
   */
  export class Option {
    constructor(isSome, value) {
      this.isSomeValue = isSome;
      if (isSome) {
        this.value = value;
      }
    }
  
    static Some(value) {
      if (value === undefined || value === null) {
        throw new Error("Option.Some cannot be called with undefined or null");
      }
      return new Option(true, value);
    }
  
    static None() {
      return new Option(false, undefined);
    }
  
    isSome() {
      return this.isSomeValue;
    }
  
    isNone() {
      return !this.isSomeValue;
    }
  
    unwrap() {
      if (this.isSomeValue) {
        return this.value;
      }
      throw new Error("Cannot unwrap None Option");
    }
  
    unwrapOr(defaultValue) {
      return this.isSomeValue ? this.value : defaultValue;
    }
  
    map(fn) {
      return this.isSomeValue ? Option.Some(fn(this.value)) : this;
    }
  
    andThen(fn) {
      return this.isSomeValue ? fn(this.value) : this;
    }
  }
  
  /**
   * 래핑된 함수에서 에러를 `Result.Err`로 반환.
   * 함수가 `undefined`를 반환하면 에러로 처리.
   * @param {Function} fn - 래핑할 함수
   * @returns {Function} 래핑된 함수
   */
  export function wrapWithResult(fn) {
    return function (...args) {
      try {
        const result = fn(...args);
  
        // undefined 처리
        if (result === undefined) {
          return Result.Err(new Error("Function returned undefined"));
        }
  
        // null 처리
        if (result === null) {
          return Result.Err(new Error("Function returned null"));
        }
  
        // NaN 처리 (숫자 연산에서만 발생)
        if (typeof result === "number" && Number.isNaN(result)) {
          return Result.Err(new Error("Function returned NaN"));
        }
  
        // Infinity 처리 (숫자 연산에서만 발생)
        if (typeof result === "number" && !Number.isFinite(result)) {
          return Result.Err(new Error("Function returned Infinity or -Infinity"));
        }
  
        return Result.Ok(result);
      } catch (error) {
        // 기타 예외 처리
        return Result.Err(error instanceof Error ? error : new Error(String(error)));
      }
    };
  }
  
  
  
  /**
   * 래핑된 함수에서 값을 `Option`으로 반환.
   * `undefined`와 `null`은 `Option.None`으로 처리.
   * @param {Function} fn - 래핑할 함수
   * @returns {Function} 래핑된 함수
   */
  export function wrapWithOption(fn) {
    return function (...args) {
      const result = fn(...args);
      if (result === undefined || result === null) {
        return Option.None();
      }
      return Option.Some(result);
    };
  }
  