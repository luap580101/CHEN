;<div className="w-75 ms-6">
  <div class="container w-75">
    <div class="mb-3">
      <label for="groups_start_time" class="form-label">
        店家名稱
      </label>
      <input type="hidden" name="shop_id" id="shop_id" value="" />
      <div
        class="border border-dark"
        style={{ height: '40px', paddingLeft: '10px', paddingTop: '5px' }}
      >
        店家名稱
      </div>
    </div>
    <div class="mb-3">
      <label for="groups_start_time" class="form-label">
        開團開始時間
      </label>
      <input
        type="date"
        class="form-control"
        data-val="true"
        id="groups_start_time"
        name="groups_start_time"
        required
      />
    </div>
    <div class="mb-3">
      <label for="groups_end_time" class="form-label">
        截止時間
      </label>
      <input
        type="date"
        class="form-control"
        id="groups_end_time"
        name="groups_end_time"
        required
      />
    </div>
    <div class="mb-3">
      <label for="eating_time eating_date" class="form-label">
        用餐時間
      </label>
      <div class="d-flex ">
        <input
          type="date"
          class="form-control w-50"
          id="eating_date"
          name="eating_date"
          required
        />
        <input
          type="time"
          class="form-control w-50"
          id="eating_time"
          name="eating_time"
          required
        />
      </div>
    </div>
    <div class="mb-3">
      <label for="least_num" class="form-label">
        成團人數
      </label>
      <input
        type="number"
        class="form-control"
        id="least_num"
        placeholder="請輸入最少成團人數
    "
        name="least_num"
        required
      />
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">
        價格
      </label>
      <input
        type="text"
        class="form-control"
        id="price"
        placeholder="請輸入價格"
        name="price"
        required
      />
    </div>

    <div>
      <button className="btn bg-primary" type="submit">
        送出
      </button>
    </div>
  </div>
</div>
