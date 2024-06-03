<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('taxi_reports', function (Blueprint $table) {
            $table->integer('reports_id')->autoIncrement();
            $table->foreignId('driver_id')->constrained;
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->float('total_distance');
            $table->decimal('total_income', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxi_reports');
    }
};
