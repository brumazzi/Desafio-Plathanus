class CreateProperties < ActiveRecord::Migration[8.0]
  def change
    create_table :properties do |t|
      t.string :title,      null: false
      t.text :description,  null: false
      t.decimal :price,     null: false
      t.string :identify,   null: false
      t.boolean :active
      t.boolean :deleted
      t.references :user, null: false, foreign_key: true
      t.references :address, null: false, foreign_key: true

      t.timestamps
    end
  end
end
