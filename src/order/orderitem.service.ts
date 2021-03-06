import { Injectable, Inject } from '@nestjs/common';
import {
  ORDER_ITEM_PROVIDER_TOKEN,
  DATABASE_EXCEPTION,
  ORDERITEMINSERTSUCCESS,
} from '../config/constants';
import { OrderItem } from './orderitem.entity';
import { OrderItem as OrderItemInterface } from './interface/orderitem.interface';
import { Transaction } from 'sequelize';

@Injectable()
export class OrderItemService {
  constructor(
    @Inject(ORDER_ITEM_PROVIDER_TOKEN)
    private readonly orderitemReposity: typeof OrderItem,
  ) {}

  public async bulkInsertOrderItem(params: OrderItemInterface[], t?: Transaction) {
    if(!t) {
      return this.orderitemReposity.bulkCreate(params);
    }
    return this.orderitemReposity.bulkCreate(params, {
      transaction: t,
    });
  }

  // public async insertOneOrderItem(params: OrderItemInterface) {
  //   let orderItem: OrderItem;
  //   try {
  //     orderItem = await this.orderitemReposity.create({
  //       ...params,
  //     });
  //   } catch (err) {
  //     let message: string;
  //     switch (typeof err) {
  //       case 'object':
  //         message = err.message;
  //         break;
  //       case 'string':
  //         message = err;
  //         break;
  //       default:
  //         break;
  //     }
  //     return {
  //       type: DATABASE_EXCEPTION,
  //       message: '数据库操作异常',
  //       data: message,
  //     };
  //   }
  //   const { order_num, order_item } = orderItem;
  //   return {
  //     type: ORDERITEMINSERTSUCCESS,
  //     message: '订单项创建成功',
  //     data: order_num,
  //   };
  // }
}
