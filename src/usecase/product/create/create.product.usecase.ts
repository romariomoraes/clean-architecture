import { v4 as uuid } from "uuid";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
    InputCreateProductDto,
    OutputCreateProductDto,
} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {

        const product = ProductFactory.make(input.name, input.price);

        await this.repository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
