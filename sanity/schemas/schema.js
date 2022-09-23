// 1. Импортируем schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// 2. Импортируем типы schema-type
import schemaTypes from 'all:part:@sanity/base/schema-type';
// 3. Импортируем "схемы" наших данных
import post from "./post";
import categoty from "./categoty";

export default createSchema({
  // 4. Присваиваем название "схеме"
  name: 'default',
  // 5. Добавляем "схемы" наших данных в sanity
  types: schemaTypes.concat([post, categoty]),
});
