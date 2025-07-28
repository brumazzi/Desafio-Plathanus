class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :icon
      t.string :tooltip

      t.timestamps
    end
  end
end
