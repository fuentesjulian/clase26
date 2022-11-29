import normalizr from "normalizr";
import util from "util";

const normalize = normalizr.normalize;
const schema = normalizr.schema;

const author = new schema.Entity("author");
const mensaje = new schema.Entity("mensaje", { author: author });
const mensajes = new schema.Entity("mensajes", { mensajes: [mensaje] });
export const getNormalized = (data) => {
  const test = normalize(data, mensajes);
  return test;
};
