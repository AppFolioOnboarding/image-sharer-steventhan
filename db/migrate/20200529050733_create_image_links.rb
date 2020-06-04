class CreateImageLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :image_links do |t|
      t.string :full_url

      t.timestamps
    end
  end
end
