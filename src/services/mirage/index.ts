import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker'

type User = {
  name: string;
  email: string;
  created_at: string,
}

export function makeServer() {
  const server = createServer({
    models: {
      //modelo das informações dos usuários
      user: Model.extend<Partial<User>>({})
    },

    // permite a geração de dados em massa
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        }
      })
    },

    // geração de dados fictícia
    seeds(server) {
      server.createList('user', 10)
    },

    routes() {
      // nome para acessar as rotas. Ex: /api/users
      this.namespace = 'api'

      // simulando um delay do consumo de uma api
      this.timing = 750

      this.get('/users')
      this.post('/users')

      // reseta o nome para não atrapalhar as API routes do nextJS
      this.namespace = ''

      // caso não haja uma rota no mirage definida, o fetch passará para as rotas deinidas no nextjs em pages/api
      this.passthrough()
    }
  })

  return server
}