<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClinicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('company_name', 255);
            $table->string('trade_name', 255);
            $table->char('cnpj', 14)->unique();
            $table->unsignedInteger('regional_id');
            $table->date('opening_date');
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->foreign('regional_id')
                ->references('id')
                ->on('regionals')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clinics');
    }
}
