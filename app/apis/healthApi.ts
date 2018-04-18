import { getConnection } from 'typeorm';
import { JsonController, Get, HeaderParam } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController()
@Service()
export class HealthApi {

  @Get('/api/v1/healthz/')
  health(): string {
    return 'success';
  }

  @Get('/api/v1/info/')
  async info(@HeaderParam('token') token: string) {
    const sql = 'SELECT 1 from tms_tasks limit 1;';
    return getConnection().query(sql);
  }
}
