export const Id = <IdType extends string>(id: string): IdType => {
  if (!id) throw new Error('id cannot be empty!');

  return id as IdType;
};
