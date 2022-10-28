import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
    name: string;
}