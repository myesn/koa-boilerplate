export default {
  /** 统计对象数组中指定字段的值出现的次数 */
  countObjectFieldValueNumberOfOccurrences(
    array: {}[],
    fieldName: string,
    fieldValue: any
  ) {
    return array.reduce((count: number, current) => {
      // @ts-ignore
      return current[fieldName] === fieldValue ? count + 1 : count;
    }, 0);
  },
};
