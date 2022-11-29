const asDtoObj = (data) => {
  return {
    id: data.id,
    author: { id: data.author.id },
    text: data.text,
    createdAt: data.createdAt,
  };
};

export function asDto(data) {

  if (Array.isArray(data)) return data.map((p) => asDtoObj(p));
  else return asDtoObj(data);
}
