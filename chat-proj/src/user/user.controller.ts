import { Controller, Get, Post, Put, Delete, Res, HttpStatus} from '@nestjs/common';

@Controller('user')
export class UserController {

    @Post('/create')

    createPost(@Res() res) {
        res.status(HttpStatus.OK).json({
            message: 'received',
        });
    }

}
