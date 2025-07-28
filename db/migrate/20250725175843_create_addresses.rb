class CreateAddresses < ActiveRecord::Migration[8.0]
  def change
    create_table :addresses do |t|
      t.string :coutry,     null: false
      t.string :state,      null: false
      t.string :uf,         null: false,  limit: 2
      t.string :city,       null: false
      t.string :district,   null: false
      t.string :street,     null: true
      t.string :number,     null: true
      t.string :complement, null: true

      t.timestamps
    end
  end
end
