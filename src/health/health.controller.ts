import {Controller, Get} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('health')
@Controller()
export class HealthController {

    @ApiOperation({summary: 'Health check'})
    @ApiResponse({status: 200, description: 'OK'})
    @Get()
    check() {
        return {status: 'ok'};
    }
}
