const { add } = require("./CalculateSum");

describe("StringCalculator basic add tests", () => {
  test("should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  test("should return the number when the input is a single number", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

  test("should return the sum of two comma-separated numbers", () => {
    expect(add("1,5")).toBe(6);
    expect(add("2,3")).toBe(5);
  });

  test("should return the sum of multiple comma-separated numbers", () => {
    expect(add("1,1,1,1,1,1,1")).toBe(7);
    expect(add("100,200,300,400")).toBe(1000);
    expect(add("0,0,0,0")).toBe(0);
  });

  test("should handle only newlines as separators", () => {
    expect(add("1\n2\n3")).toBe(6);
    expect(add("4\n5\n6")).toBe(15);
    expect(add("7\n8\n9\n10")).toBe(34);
  });

  test("should handle commas and newlines as separators", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("4,5\n6")).toBe(15);
    expect(add("7,8\n9")).toBe(24);
  });
});

describe("StringCalculator with custom delimiters", () => {
  test("should return the sum using a custom delimiter", () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n1|2|3")).toBe(6);
    expect(add("//,\n4,5\n6")).toBe(15);
  });
});

describe("StringCalculator with negative number checks", () => {
  test("should throw an error for a single negative number", () => {
    expect(() => add("//;\n1;2;-3")).toThrow("Negatives not allowed: -3");
  });

  test("should throw an error for multiple negative numbers", () => {
    expect(() => add("//;\n-1;2;-3")).toThrow("Negatives not allowed: -1, -3");
  });

  test("should throw an error for mixed positive and negative numbers", () => {
    expect(() => add("//;\n1;-2;3;-4")).toThrow(
      "Negatives not allowed: -2, -4"
    );
  });
});

describe("StringCalculator with number limit checks", () => {
  test("should ignore a single number greater than 1000", () => {
    expect(add("2,1001")).toBe(2);
  });

  test("should return the sum of numbers less than or equal to 1000", () => {
    expect(add("1000,1001")).toBe(1000);
  });

  test("should sum multiple numbers, ignoring those greater than 1000", () => {
    expect(add("1,2,3,1001")).toBe(6);
  });

  test("should sum numbers using a custom delimiter, ignoring those greater than 1000", () => {
    expect(add("//;\n1;2;1001")).toBe(3);
  });
});

describe("StringCalculator with multi-length delimiters", () => {
  test("should handle multi-character delimiter", () => {
    expect(add("//[**]\n1**2**3")).toBe(6);
  });

  test("should handle different multi-character delimiters", () => {
    expect(add("//[##]\n2##3##4")).toBe(9);
    expect(add("//[--]\n5--10--15")).toBe(30);
  });

  test("should throw an error for negative numbers with custom delimiter", () => {
    expect(() => add("//[##]\n2##-3##4")).toThrow("Negatives not allowed: -3");
  });

  test("should ignore numbers larger than 1000 with multi-length delimiter", () => {
    expect(add("//[**]\n2**1001**3")).toBe(5);
  });
});

describe("StringCalculator with multiple delimiters", () => {
  test("should handle multiple single-character delimiters", () => {
    expect(add("//[*][%]\n1*2%3")).toBe(6);
  });

  test("should handle multiple multi-character delimiters", () => {
    expect(add("//[***][%%%]\n1***2%%%3")).toBe(6);
  });

  test("should handle multiple delimiters and ignore numbers greater than 1000", () => {
    expect(add("//[*][%]\n1*2000%3")).toBe(4);
  });

  test("should handle mixed single and multi-character delimiters", () => {
    expect(add("//[*][%%][###]\n1*2%%3###4")).toBe(10);
  });

  test("should handle empty delimiters", () => {
    expect(add("//[]\n1234")).toBe(10);
  });

  test("should handle various delimiters", () => {
    expect(add("//[;]]\n1;2;3;4")).toBe(10);
  });

  test("should handle alpha chars", () => {
    expect(add("//[abc]]\n1abc2abc3abc4")).toBe(10); // Expect the sum
  });
});
