import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Contact{

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column("varchar", {length: 100})
    email: string;

    @Column("varchar", {length: 100, nullable:true})
    address: string;

    @Column({default: true})
    active: boolean

    @Column("varchar", {length: 100, nullable:true})
    img_url: string;

    @CreateDateColumn({
        type: "datetime",
    })
    created_at: Date

    @UpdateDateColumn({
        type: "datetime",
    })
    updated_at: Date

}