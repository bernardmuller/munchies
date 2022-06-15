import {Knex} from 'knex'
import {createUser} from '../src/users/actions/createUser'

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del()
  // await knex('users').insert([
  //   {id: '0b2fa9e8-f06b-44cb-94ab-e79791028b55', firstName: 'George'},
  // ])
  await createUser({firstName: 'George', emailAddress: 'g@cat.com'})
  await createUser({firstName: 'Archie', emailAddress: 'a@cat.com'})
  await createUser({firstName: 'Snippy', emailAddress: 's@cat.com'})
}
