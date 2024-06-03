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
        Schema::create('sales_jouranl', function (Blueprint $table) {
        $table->integer('sales_jouranl_id')->autoIncrement();
        $table->string('name');
        $table->integer('sale');
        $table->decimal('amount', 10, 2);
        $table->date('date');
        $table->foreignId('franchiseSystem_id')->constrained;
        $table->string('status')->default('pending');
        $table->string('is_deleted')->default(0);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_jouranl');
    }
};
